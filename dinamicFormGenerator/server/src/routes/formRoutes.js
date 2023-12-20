// src/routes/formRoutes.js
import express from "express";
import formController from "../controllers/formController.js";

const router = express.Router();




router.post("/create", formController.createForm);
router.get("//getFormByName", formController.getFormByName);
router.get("/getAllForms", formController.getAllForms);
router.delete("/deleteFormById", formController.deleteFormById);
router.post("/storeResponse/:formId", formController.storeResponse);
router.get("/getFormById/:id", formController.getFormById);
router.delete("/deleteSubmission", formController.deleteSubmission);

export default router;


