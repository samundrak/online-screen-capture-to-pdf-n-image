var shell = require('./Shell');
module.exports = function (app, express) {
    var api = express();
    api.get('/',(req,res)=>{
        res.render('screen_capture',{
            title: 'Website ScreenShot and PDF'
        });
    });

    api.get('/shots',shell.screenShot);
    api.get('/download',shell.download);
    app.use('/screen', api);
};