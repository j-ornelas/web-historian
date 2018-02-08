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
      
    var data = '';
    req.on('data', function(chunk) {
      data += chunk + '\n';
      data = data.slice(4);
    });
    req.on('end', function() {
      fs.appendFile(__dirname + '/archives/sites.txt', data, (err) => {
        if (err) {
          throw err;
        }
        var currentUrl = __dirname + '/archives/sites' + '/' + data.slice(0, -1);
        console.log('the data may have been appended');
        console.log('DATA', JSON.stringify(data.slice(0, -1)));
        console.log(__dirname + '/archives/sites/' + data);
        fs.exists(currentUrl, (exists) => {
          if (exists) {
          // if not, check sites.txt => check later page
          // if not in archive or sites.txt, add to sites.txt
          // set up worker to periodically download from sites.txt
            fs.readFile(currentUrl, 'utf-8', (err, data) => {
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
          }
        });
      });
    });
    // res.writeHead(302, {'Content-Type': 'text/html'});
    // res.end('test');
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


// fs.readdir(__dirname + '/archives/sites', (err, files) => {
//   files.forEach(file => {
//     console.log('data = ', JSON.stringify(data));
//     console.log('file = ', JSON.stringify(file));
//     if (JSON.stringify(file + '\n') === JSON.stringify(data)) {
      
//     }
//   });
//   console.log('FALSE FALSE');
// });