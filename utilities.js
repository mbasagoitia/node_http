const getRouteInfo = (method, url, reqBody) => {
    const info = {
        statusCode: 200,
        contentType: "text/html",
        content: "",
    }
  
    switch(true) {
      case url == "/" && method == "GET": 
        info.content = "<h1>Homepage</h1>";
        break;
      case url == "/about" && method == "GET": 
        info.contentType = "application/json";
        info.content = JSON.stringify({ name: "Marika", age: 24, location: "New Haven, CT" });
        break;
      case url == "/echo" && method == "POST": 
        info.contentType = "application/json";
        info.content = JSON.stringify({ url, method, reqBody });
        break;
      default: 
        info.statusCode = 404;
        info.content = "<h1>Error 404: Page not found</h1>";
    }
    return info;
  };

  module.exports = { getRouteInfo };