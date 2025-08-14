import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  upadteUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// Get user data
router.get("/user", requireAuth(), getUserData);

// Apply for a job
router.post("/apply", requireAuth(), applyForJob);

// Get applied jobs data
router.get("/applications", requireAuth(), getUserJobApplications);

// Update user profile (Resume)
router.post(
  "/update-resume",
  requireAuth(),
  upload.single("resume"),
  upadteUserResume
);

export default router;
