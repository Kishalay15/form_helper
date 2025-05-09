import Form from "../models/Form.js";
import User from "../models/User.js";
import Question from "../models/Question.js";

export const createForm = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: "Title and User ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const form = new Form({ title, description, user: userId });

    await form.save();

    user.forms.push(form._id);
    await user.save();

    res.status(201).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllForms = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const forms = await Form.find({ user: userId }).populate("questions");
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id).populate("questions");
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
      return res.status(400).json({
        error: "At least one field (title or description) is required",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;

    const form = await Form.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const user = await User.findById(form.user);
    if (user) {
      user.forms = user.forms.filter((formId) => formId.toString() !== id);
      await user.save();
    }

    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addQuestionToForm = async (req, res) => {
  try {
    const { formId, questionId } = req.params;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    if (form.questions.includes(questionId)) {
      return res
        .status(400)
        .json({ error: "Question already added to this form" });
    }

    form.questions.push(questionId);
    await form.save();

    res.status(200).json(form);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const removeQuestionFromForm = async (req, res) => {
  try {
    const { formId, questionId } = req.params;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    if (!form.questions.includes(questionId)) {
      return res
        .status(404)
        .json({ error: "Question not associated with this form" });
    }

    form.questions = form.questions.filter(
      (question) => question.toString() !== questionId
    );
    await form.save();

    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
