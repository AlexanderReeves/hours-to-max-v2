const fetch = require('node-fetch');

exports.getJsonFromUrl = async (req, res) => {
  try {
    //const { url } = req.query;

    //if (!url) {
    //  return res.status(400).json({ error: 'URL parameter is required' });

    //}
    const { url } = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=Arrgs";
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: `Failed to fetch from URL: ${response.statusText}` });
    }

    const data = await response.json();
    res.send(data)
    //res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving data: ${error.message}` });
  }
};
