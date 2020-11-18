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

function rollDice() 
{
    document.getElementById("dice").value = Math.floor(Math.random()*6) + 1;
}