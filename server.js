var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) 
{
  fs.readFile('index.html', function(err, data) 
  {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

function x()
{
  var x = Math.floor((Math.random() * 300) + 1);
  return x;
}

function y()
{
  var y = Math.floor((Math.random() * 300) + 1);
  return y;
}
