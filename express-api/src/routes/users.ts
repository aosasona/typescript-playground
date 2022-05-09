import express, { Router, Request, Response } from "express";
import axios from "axios";
const router: Router = express.Router();

//Interface for User
interface User {
  firstName: string;
  lastName: string;
  email?: string;
  id?: string;
}

/**
 * @access public
 * @method GET
 * @route /api/users
 */
router.get("/users", async (req: Request, res: Response) => {
  axios
    .get("http://localhost:3000/users")
    .then((response: any) => {
      let data: User = response.data;
      res.status(200).json({ data });
    })
    .catch((err: any) => {
      return res.status(500).json({ message: err.message });
    });
});

/**
 * @access public
 * @method POST
 * @route /api/users
 */
router.post("/users", async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;

  let data: User = {
    firstName,
    lastName,
    email,
  };

  axios
    .post("http://localhost:3000/users", data)
    .then((response: any) => {
      let user: User = response.data;
      res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});
module.exports = router;
