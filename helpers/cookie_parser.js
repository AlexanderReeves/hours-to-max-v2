//This page reads in all cookies that are sent through the headers of a request
//By default all cookies are available in a request header

exports.parseCookies = function(request) {
    console.log('Cookie Parser results:')
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });
    //The only cookie currently saved is the jwt key.
    //The jwt contains the email and username of the signed in user.
    console.log(list)
    return list;
}