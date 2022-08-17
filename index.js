require('dotenv').config();
const functions = require('@google-cloud/functions-framework');
const repository = require('./src/file-repository');

functions.http('bet-image-uploader', async (req, res) => {    
    try {                
        _assertMethod('POST', req.method);    
        const urls = await repository.execute(req.body);
        const response = JSON.stringify(urls);        
        console.log('finished', response);
        return res.status(200).send({ status: 'success', createdFiles: response.length }).end();
    } catch (e) {
        if (e instanceof InvaidHttpMethodError) {
            var statusCode = 405;
        } else {
            var statusCode = 500;
        }
        return res.status(statusCode).send(JSON.stringify(e));
    }
});

function _assertMethod(expected, actual) {
    if (expected != actual) {
        throw InvaidHttpMethodError(method);
    }
}

class InvaidHttpMethodError extends Error {
    
    /**
     * 
     * @param {String} method http method used in the request 
     */
    constructor(method) {
        super(`http method ${req.method} is not allowed for this URL`)
        this.method = method;
    }
}