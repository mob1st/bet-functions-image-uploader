const { download } = require('./downloader');
const { upload } = require('./uploader');

async function execute(downloadBatch) {
    console.log('starting download for', JSON.stringify(downloadBatch.id));
    const urls = [];
    for (index = 0; index < downloadBatch.batch.length; index++) {        
        const downloadable = downloadBatch.batch[index];
        console.log('downloading', index, JSON.stringify(downloadable));
        const downloaded = await download(downloadable.url);  
        console.log('uploading', index, downloadable.fileName);    
        const publicUrl = await upload(downloadable.fileName, downloaded);
        console.log('public URL', index, publicUrl);
        urls.push(publicUrl);
    }
    return urls;
}

module.exports = {
    execute
}