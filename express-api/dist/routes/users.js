"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
/**
 * @access public
 * @method GET
 * @route /api/users
 */
router.get("/users", async (req, res) => {
    axios_1.default
        .get("http://localhost:3000/users")
        .then((response) => {
        let data = response.data;
        res.status(200).json({ data });
    })
        .catch((err) => {
        return res.status(500).json({ message: err.message });
    });
});
/**
 * @access public
 * @method POST
 * @route /api/users
 */
router.post("/users", async (req, res) => {
    const { firstName, lastName, email } = req.body;
    let data = {
        firstName,
        lastName,
        email,
    };
    axios_1.default
        .post("http://localhost:3000/users", data)
        .then((response) => {
        let user = response.data;
        res.status(200).json({ user });
    })
        .catch((err) => {
        return res.status(500).json({ message: err.message });
    });
});
module.exports = router;
