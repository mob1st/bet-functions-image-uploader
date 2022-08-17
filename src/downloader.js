const axios = require('axios').default;

/**
 * Downloads the file from the given url in a stream format
 * 
 * @param {String} url to download
 * @returns the stream file
 */
function download(url) {
    return axios({
        url: url,
        method: 'GET',
        responseType: 'stream'
    }).then((res) => res.data);
}

module.exports = {
    download
}