import express from "express";
import testController from "../controllers/test.controller.js";

const router = express.Router();

router.get("/hello", testController.helloWorld);

export default router;