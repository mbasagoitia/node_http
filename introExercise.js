const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("Hello World");
    res.end();
}).listen(5000, () => {
    console.log("Listening on port 5000...");
});