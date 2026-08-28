const jwt = require('jsonwebtoken');
const cookieParser = require('./cookie_parser');
const { ipKeyGenerator, rateLimit } = require('express-rate-limit');

function getAccessToken(req) {
    const cookies = cookieParser.parseCookies(req);
    const cookieToken = cookies.authorization;
    const bodyToken = req.body && (req.body.auth || req.body.authCode);
    const authorizationHeader = req.get('authorization');

    if (cookieToken) return cookieToken;
    if (bodyToken) return bodyToken;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        return authorizationHeader.slice(7);
    }

    return null;
}

function getUserRateLimitKey(req) {
    const accessToken = getAccessToken(req);

    if (accessToken) {
        const accessPayload = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (accessPayload && accessPayload.aud) {
            return `user:${accessPayload.aud}`;
        }
    }

    const cookies = cookieParser.parseCookies(req);
    const refreshPayload = verifyToken(cookies.refreshAuthorization, process.env.REFRESH_TOKEN_SECRET);
    if (refreshPayload && refreshPayload.aud) {
        return `user:${refreshPayload.aud}`;
    }

    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    return `ip:${ipKeyGenerator(ip, 64)}`;
}

function verifyToken(token, secret) {
    if (!token || !secret) return null;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

function isLocalhost(req) {
    const addresses = [req.ip, req.socket && req.socket.remoteAddress];
    return addresses.some(address => {
        if (!address) return false;
        const normalizedAddress = address.toLowerCase().replace(/^::ffff:/, '');
        return normalizedAddress === '127.0.0.1' || normalizedAddress === '::1';
    });
}

const limiterOptions = {
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skip: isLocalhost,
    message: 'Sorry, you have been rate limited. Please try again later.'
};

module.exports = {
    perMinute: rateLimit({
        ...limiterOptions,
        windowMs: 60 * 1000,
        limit: 10,
        keyGenerator: getUserRateLimitKey
    }),
    perHour: rateLimit({
        ...limiterOptions,
        windowMs: 60 * 60 * 1000,
        limit: 80,
        keyGenerator: getUserRateLimitKey
    })
};