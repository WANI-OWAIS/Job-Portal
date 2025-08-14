import express from "express";
import {
  changeJobApplicantionStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//Register a company
router.post("/register", upload.single("image"), registerCompany);

//Company login
router.post("/login", loginCompany);

//Get company data
router.get("/company", protectCompany, getCompanyData);

//Post a job
router.post("/post-job", protectCompany, postJob);

//Get Applicants data of a company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

//Get Company Job list
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

//Change job application status
router.post("/change-status", protectCompany, changeJobApplicantionStatus);

//Change appliactions visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
