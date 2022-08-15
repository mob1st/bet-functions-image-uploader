const functions = require('@google-cloud/functions-framework');

functions.http('bet-image-uploader', async (req, res) => {    
    try {
        _assertMethod('POST', req.method);
        return res.status(200).send({message: 'success top'}).end();
    } catch (e) {
        if (e instanceof InvaidHttpMethodError) {
            var statusCode = 405;
        } else {
            var statusCode = 500;;
        }   
        return res.status(statusCode).send(JSON.stringify());     
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