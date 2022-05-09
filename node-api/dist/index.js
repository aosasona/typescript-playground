"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const url_1 = __importDefault(require("url"));
const axios_1 = __importDefault(require("axios"));
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
function dir(name) {
    const request = path_1.default.join(__dirname, "..", "public", name);
    //   console.log(request);
    return request;
}
const server = http_1.default.createServer(async (req, res) => {
    //URL VARIABLES
    const currentUrl = req.url ? req.url : "/";
    const parsedUrl = url_1.default.parse(currentUrl);
    if (req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        fs_1.default.readFile(dir(currentUrl === "/" ? "index.html" : currentUrl), (error, file) => {
            if (error) {
                res.end(errorPage);
            }
            //   console.log(file);
            res.end(file);
        });
    }
    else if (req.method === "POST") {
        // console.log(parsedUrl);
        if (parsedUrl.pathname === "/users") {
            //Fetch data
            axios_1.default
                .get("http://localhost:9000/users")
                .then((response) => {
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
        }
        else if (parsedUrl.pathname === "/users/add") {
            let body;
            req.on("data", (buffer) => {
                body = buffer.toString();
            });
            req.on("end", () => {
                const dataArray = body.split("&");
                let data = {
                    firstName: "",
                    lastName: "",
                    email: "",
                };
                data.firstName = dataArray[0] ? dataArray[0].split("=")[1] : "";
                data.lastName = dataArray[1] ? dataArray[1].split("=")[1] : "";
                data.email = dataArray[2] ? dataArray[2].split("=")[1] : "";
                axios_1.default
                    .post("http://localhost:9000/users", data)
                    .then((response) => {
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
        }
        else {
            res.writeHead(404, {
                "content-type": "application/json",
            });
            res.end(JSON.stringify({ message: "Oops!" }));
        }
    }
});
const PORT = process.env.PORT || 8500;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
