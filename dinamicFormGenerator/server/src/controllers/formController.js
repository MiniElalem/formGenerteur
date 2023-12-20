

import Form from "../models/form.js";
import Counter from "../models/counter.js";


const createForm = async (req, res) => {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: "formId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const { name, description, fields } = req.body;

      console.log("fields", fields);
      const newForm = new Form({
        id: counter.seq,
        name: name,
        description: description,
        fields: fields,
      });
      console.log("newForm", newForm);

      await newForm.save();

      res.json({ success: true, msg: "Form Created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Failed to create form" });
    }
  };
  

//get form by name

const getFormByName = async (req, res) => {
    try {
        const form = await Form.findOne({ name: req.params.name });
        res.json({ success: true, form });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to get form" });
    }
    };


//delete a form by id

const deleteFormById = async (req, res) => {
    try {
             const deletedForm = await Form.findOneAndDelete({ id: req.body.id });
        res.json({ success: true, deletedForm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to delete form" });
    }

};

const getAllForms = async (req, res) => {
    try {
                const forms = await Form.find();
        res.json({ success: true, forms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to get forms" });
    }
    };


const getFormById = async (req, res) => {

    try {

        const form = await Form.findOne({ id: req.params.id });
        res.json({ success: true, form });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to get form" });
    }
    };



const storeResponse = async (req, res) => {
    const { formId } = req.params;
    const { responses } = req.body;

    try {
      const form = await Form.findOne({ id: formId });


      if (!form) {
        return res.status(404).json({ success: false, message: 'Form not found' });
      }

      form.submissions.push({ responses });


      await form.save();

      return res.status(200).json({ success: true, message: 'Response stored successfully' });
    } catch (error) {
      console.error('Error storing response:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
      };

      const deleteSubmission = async (req, res) => {
        const { formId, submissionIndex } = req.body;
    
        try {
            console.log('Received request with formId:', formId, 'and submissionIndex:', submissionIndex);
    
            const form = await Form.findOne({ id: formId });
    
            if (!form) {
                return res.status(404).json({ success: false, message: 'Form not found' });
            }
    
            // Assuming submissionIndex is the index of the submission you want to delete
            console.log('Before deletion, submissions array:', form.submissions);
            form.submissions.splice(submissionIndex, 1);
            console.log('After deletion, submissions array:', form.submissions);
    
            await form.save();
    
            return res.status(200).json({ success: true, message: 'Submission deleted successfully' });
        } catch (error) {
            console.error('Error deleting submission:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
    


const formController = {
    createForm,
    getFormByName,
    getAllForms,
    deleteFormById,
    storeResponse,
    getFormById,
    deleteSubmission,
    };



export default formController;




