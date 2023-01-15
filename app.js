const http = require("http");
const { getRouteInfo } = require("./utilities")

//my solution before watching the exercise video, which (kind of) worked

// http
//   .createServer(function (req, res) {
//     let contentType = "text/html";
//     let responseBody = "default";

//     req.on("error", function (err) {
//       res.writeHead(400, { "Content-Type": "text/html" });
//       res.write("An error occurred because of your request : (");
//       res.end();
//     });
//     res.on("error", function (err) {
//       res.writeHead(500, { "Content-Type": "text/html" });
//       res.write("An error occurred on the server : (");
//       res.end();
//     });
    
//     const chunks = [];

//     req.on("data", (chunk) => {
//       chunks.push(chunk);
//     })

//     req.on("end", () => {
//       body = Buffer.concat(chunks).toString();
//       if (req.url == "/") {
//         responseBody = "Homepage";
//       } else if (req.url == "/about") {
//         contentType = "application/json";
//         responseBody = JSON.stringify({name: "Marika", age: 24, location: "New Haven, CT"});
//       } else if (req.url = "/echo") {
//         contentType = "application/json";
//         responseBody = JSON.stringify({method: req.method, url: req.url, body: body});
//       } else {
//         responseBody = "<h1>Page Not Found.<h1><br><a href = '/'>Go to home</a>";
//       }
//       res.writeHead(200, { "Content-Type": contentType});
//       res.write(responseBody);
//       res.end();
//     });
//   })
//   .listen(3000, () => {
//     console.log("listening on port 3000");
//   });

//solution following along with the exercise video

const port = 3000;

const requestHandler = (req, res) => {
  const chunks = [];

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    const { url, method } = req;
    let reqBody;

    try {
      reqBody = JSON.parse(Buffer.concat(chunks).toString());
    } catch (err) {
      console.error("Request body cannot be parsed to JSON");
      reqBody = null;
    }

    const { statusCode, contentType, content } = getRouteInfo(method, url, reqBody);

    res.writeHead(statusCode, { "Content-Type": contentType });
    res.write(content);
    res.end();
  });
}

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

