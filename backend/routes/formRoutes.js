import express from "express";
import {
  addQuestionToForm,
  createForm,
  deleteForm,
  getAllForms,
  getFormById,
  removeQuestionFromForm,
  updateForm,
} from "../controllers/formController";

const router = express.Router();

router.post("/forms", createForm);
router.get("/forms/user/:userId", getAllForms);
router.get("/forms/:id", getFormById);
router.put("/forms/:id", updateForm);
router.delete("/forms/:id", deleteForm);
router.post("/forms/:formId/questions/:questionId", addQuestionToForm);
router.delete("/forms/:formId/questions/:questionId", removeQuestionFromForm);

export default router;
