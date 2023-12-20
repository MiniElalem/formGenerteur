import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./viewSubmissions.css";

const ViewSubmissions = ({ formId }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/forms/getFormById/${formId}`)
      .then((res) => {
        console.log(res.data.form);
        setForm(res.data.form);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formId]);

  const handleDeleteSubmission = async (submissionIndex) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/forms/deleteSubmission`,
        {
        data: { formId, submissionIndex },
        }
      );

      if (response.data.success) {
        // Reload submissions after deletion
        setForm((prevForm) => ({
          ...prevForm,
          submissions: prevForm.submissions.filter((_, i) => i !== submissionIndex),
        }));
        alert('Submission deleted successfully');
      } else {
        alert('Error deleting submission');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>View Submissions</h1>
      <h2>Form Name: {form.name}</h2>
      <h2>Form Description: {form.description}</h2>
      <h2>Form Fields:</h2>
      <ul>
        {form.fields &&
          form.fields.map((field) => (
            <li key={field._id}>
              {field.type} {field.text ? `: ${field.text}` : ''}
            </li>
          ))}
      </ul>
      <h2>Form Submissions:</h2>
      <ul>
        {form.submissions &&
          form.submissions.map((submission, submissionIndex) => (
            <li key={submissionIndex}>
              {submission.responses.map((response, i) => (
                <div key={i}>
                  {form.fields[i].type}: {form.fields[i].text}: {response}
                </div>
              ))}
              <button onClick={() => handleDeleteSubmission(submissionIndex)}>
                Delete Submission
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewSubmissions;
