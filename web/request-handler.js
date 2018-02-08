var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    
    // console.log('archive.paths.index', archive.paths.index);
    // console.log('archive.paths.list', archive.paths.list);
    //console.log(path.paths.index);
    // console.log('GET request = ', req);
    //console.log('GET response = ', res);  
    //console.log('archive.paths.index', archive.paths.index); 
    //console.log('archive.paths', archive.paths); 
    //console.log('archive', archive);  
    var websiteUrl = (req.url === '/') 
      ? ('/public/index.html') 
      : ('/archives/sites' + req.url);

    fs.readFile(__dirname + websiteUrl, 'utf-8', (err, data) => {
      console.log(req.url);
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(data);
      } else {
        console.log('success');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  },
  'POST': function(req, res) {
    // console.log('POST request = ', req);
    // console.log('POST response = ', res);      
      
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
      data = data.slice(4);
    });
    req.on('end', function() {
      fs.appendFile('/Users/student/code/hrsf90-web-historian/archives/sites.txt', data, (err) => {
        if (err) {
          throw err;
        }
        console.log('the data may have been appended');
      });
    });
    res.writeHead(302, {'Content-Type': 'text/html'});
    res.end();
  },
  'OPTIONS': function(req, res) {}
};

exports.handleRequest = function (req, res) {
  //console.log('handle req request = ', req);
  //console.log('handle req response = ', res);      
  if ( actions[req.method] ) {
    actions[req.method](req, res);
  }
};