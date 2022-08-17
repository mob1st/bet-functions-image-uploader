const { Stream, Writable } = require('stream');
const { storage }  = require('./firebase-setup.js');
/**
 * Upload the given stream into a bucket storage to save it
 * 
 * @param {String} fileName the name of the file that will be created
 * @param {Stream} stream the stream used to write in the file
 */
async function upload(fileName, stream) {
    // write & upload the file
    const bucket = storage.bucket();
    console.log('--creating the file', fileName);
    const file = bucket.file(fileName);
    const writable = stream.pipe(file.createWriteStream());
    
    // await the writing to be possible to make it public
    console.log('--writing in the file', fileName);
    await _writableToPromise(writable);

    // expose url
    console.log('--making the file public', fileName);
    await file.makePublic();

    return file.publicUrl();
}

/**
 * Converts the given writable into a promise
 * 
 * the finish event will resolve the promise, the error event will reject the promise
 * @param {Writable} writable given writable
 */
function _writableToPromise(writable) {
    return new Promise((resolve, reject) => {
        writable.on('finish', () => {
            console.log('file written');
            resolve();
        });

        writable.on('error',(e) => {
            console.error('error on write in the file', e);
            reject(e)
        });     
    });
}

module.exports = {
    upload
}