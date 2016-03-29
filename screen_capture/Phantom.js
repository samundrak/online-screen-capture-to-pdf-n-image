var page = require('webpage').create();
var system = require('system');
var url = require('url');
var link = system.args[1];
var urlData = url.parse(link);
var fileName = urlData.hostname;
var args = {
    url: system.args[1],
    width: system.args[2],
    height: system.args[3],
    hash: system.args[4],
    timeout: parseInt(system.args[5])
}

console.log("web link is    " + link);
console.log("After " + args.timeout)
page.viewportSize = {width: args.width, height: args.height};
page.open(link, function (status) {
    console.log(status)
    if (status != 'success') {
        console.log('Unable to open url, is url valid');
        phantom.exit();
        return;
    }
    var title = page.evaluate(function () {
        return document.title;
    });
    setTimeout(function () {
        console.log('snap taken');
        page.render('downloads/webshots/' + args.hash + ".png");
        page.render('downloads/pdf/' + args.hash + ".pdf");
        phantom.exit();
    }, args.timeout * 1000);
});
setTimeout(function () {
    console.log("Took so much time so exited ");
    phantom.exit();
}, 60000 + (args.timeout * 1000));

