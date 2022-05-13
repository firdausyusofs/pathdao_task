import express, {Router} from "express";

const UserController = require("../controllers/userController");

const router: Router = express.Router();

router.put('/user', UserController.updateName);
router.get('/user/me', UserController.getProfile);

export default router;