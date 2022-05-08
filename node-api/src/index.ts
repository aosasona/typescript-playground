import http from "http";
import path from "path";
import fs from "fs";
import url from "url";

function dir(name: string) {
  const request: string = path.join(__dirname, "..", "public", name);
  //   console.log(request);
  return request;
}

const server = http.createServer((req, res) => {
  //URL VARIABLES

  const currentUrl: string = req.url ? req.url : "/";
  const parsedUrl = url.parse(currentUrl);

  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    fs.readFile(
      dir(currentUrl === "/" ? "index.html" : currentUrl),
      (error: any, file: Buffer) => {
        if (error) {
          res.end("<h1>Error</h1><h2>Something went wrong!</h2>");
        }
        //   console.log(file);
        res.end(file);
      }
    );
  }
});

const PORT: string | number = process.env.PORT || 8500;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
