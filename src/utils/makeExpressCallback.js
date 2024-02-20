// function that creates a callback function for express
function makeExpressCallback(controller) {
  console.log("creating callback function");
  return (req, res) => {
    console.log("req.body", req.body);
    console.log("req.query", req.query);
    console.log("req.params", req.params);
    console.log("req.ip", req.ip);
    console.log("req.method", req.method);
    console.log("req.path", req.path);
    console.log("req.get", req.get("Content-Type"));
    console.log("req.get", req.get("referer"));
    console.log("req.get", req.get("User-Agent"));
    console.log("req.get", req.get("Accept"));
    console.log("req.get", req.get("Accept-Encoding"));
    console.log("req.get", req.get("Accept-Language"));
    console.log("req.get", req.get("Connection"));
    console.log("req.get", req.get("Host"));
    console.log("req.get", req.get("Origin"));
    console.log("req.get", req.get("Sec-Fetch-Dest"));
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) =>
        res.status(500).send({ error: "An unkown error occurred." })
      );
  };
}

export default makeExpressCallback;
