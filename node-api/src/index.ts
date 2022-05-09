import http from "http";
import path from "path";
import fs from "fs";
import url from "url";
import axios from "axios";

//Error page
const errorPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      html,
      body {
        font-family: "Courier New", Courier, monospace;
      }
      .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 style="color: #151515">404</h1>
      <h2
        style="
          display: block;
          font-weight: 400;
          font-size: 20px;
          text-decoration: underline;
        "
      >
        PAGE NOT FOUND
      </h2>
    </div>
  </body>
</html>
`;

//Get the filename
function dir(name: string) {
  const request: string = path.join(__dirname, "..", "public", name);
  //   console.log(request);
  return request;
}

const server = http.createServer(async (req, res) => {
  //URL VARIABLES

  const currentUrl: string = req.url ? req.url : "/";
  const parsedUrl: any = url.parse(currentUrl);

  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    fs.readFile(
      dir(currentUrl === "/" ? "index.html" : currentUrl),
      (error: any, file: Buffer) => {
        if (error) {
          res.end(errorPage);
        }
        //   console.log(file);
        res.end(file);
      }
    );
  } else if (req.method === "POST") {
    // console.log(parsedUrl);
    if (parsedUrl.pathname === "/users") {
      //Fetch data
      axios
        .get("http://localhost:9000/users")
        .then((response: any) => {
          //   console.log(response.data);
          res.writeHead(200, {
            "content-type": "application/json",
          });
          res.end(JSON.stringify(response.data));
        })
        .catch((err) => {
          res.writeHead(500, {
            "content-type": "application/json",
          });
          res.end(JSON.stringify({ message: err.message }));
        });
    } else if (parsedUrl.pathname === "/users/add") {
      interface Data {
        firstName: string;
        lastName: string;
        email?: string;
      }
      let body: string;
      req.on("data", (buffer) => {
        body = buffer.toString();
      });
      req.on("end", () => {
        const dataArray: string[] = body.split("&");
        let data: Data = {
          firstName: "",
          lastName: "",
          email: "",
        };
        data.firstName = dataArray[0] ? dataArray[0].split("=")[1] : "";
        data.lastName = dataArray[1] ? dataArray[1].split("=")[1] : "";
        data.email = dataArray[2] ? dataArray[2].split("=")[1] : "";

        axios
          .post("http://localhost:9000/users", data)
          .then((response: any) => {
            //   console.log(response.data);
            res.writeHead(200, {
              "content-type": "application/json",
            });
            res.end(JSON.stringify(response.data));
          })
          .catch((err) => {
            res.writeHead(500, {
              "content-type": "application/json",
            });
            res.end(JSON.stringify({ message: err.message }));
          });
      });
    } else {
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify({ message: "Oops!" }));
    }
  }
});

const PORT: string | number = process.env.PORT || 8500;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
