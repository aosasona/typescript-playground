"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const url_1 = __importDefault(require("url"));
function dir(name) {
    const request = path_1.default.join(__dirname, "..", "public", name);
    //   console.log(request);
    return request;
}
const server = http_1.default.createServer((req, res) => {
    //URL VARIABLES
    const currentUrl = req.url ? req.url : "/";
    const parsedUrl = url_1.default.parse(currentUrl);
    if (req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        fs_1.default.readFile(dir(currentUrl === "/" ? "index.html" : currentUrl), (error, file) => {
            if (error) {
                res.end("<h1>Error</h1><h2>Something went wrong!</h2>");
            }
            //   console.log(file);
            res.end(file);
        });
    }
});
const PORT = process.env.PORT || 8500;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
