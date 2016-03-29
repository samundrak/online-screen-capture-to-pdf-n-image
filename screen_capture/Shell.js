var shell = require('shelljs/global');
var crypto = require('crypto');
var fs = require('fs');
var docx = require('pdfkit');
module.exports = {

    exec: (req, res, next) => {
        exec('phantomjs ');
        res.send(200);
    },
    screenShot: (req, res)=> {
        if (!req.query.url || !req.query.width || !req.query.height) {
            return res.json(req.error("Please provide url,width and height"));
        }

        var uri = crypto.createHmac('md5', 'samundrakc').update(req.query.url + Date.now()).digest('hex');

        if (!req.query.timeout)
            req.query.timeout = 0;
        req.query.timeout = parseInt(req.query.timeout);
        if (typeof req.query.timeout != "number")
            req.query.timeout = 0;

        if (req.query.timeout > 200) {
            return res.json(req.error("Sorry more then 200 seconds is not allowed"));
        }
        res.json(req.success({
            filename: uri
        }));
        exec('phantomjs screen_capture/Phantom.js ' + req.query.url + ' ' + req.query.width + " " + req.query.height + " " + uri + " " + req.query.timeout);

    },
    download: (req, res)=> {
        if (!req.query.file) {
            return res.json(req.error("Please provide filename"));
        }

        if (req.query.type === 'pdf') {
            var file = 'downloads/pdf/' + req.query.file ;
        } else {
            var file = 'downloads/webshots/' + req.query.file ;

        }
    console.log(file)
        fs.access(file, fs.F_OK, (err)=> {
            if (!err) {
                if (req.query.type) {
                    if (req.query.type === 'pdf') {
                    }
                }
                return res.download(file);
            } else {
                return res.json(req.error(" Sorry ..."));
            }
        });
    }
}