import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./viewForm.css";
import ViewSubmissions from "../components/viewSubmissions";
const ViewForm = () => {
  const [formData, setFormData] = useState({});
  const [forma, setForm] = useState({});
  const { id } = useParams();
const [radioOptions, setRadioOptions] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/forms/getFormById/${id}`)
      .then((res) => {
        console.log(res.data.form);
        setForm(res.data.form);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Add id as a dependency to re-fetch data when id changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = Object.values(formData);

      console.log("responses", responses);
      const response = await axios.post(
        'http://localhost:5000/api/forms/storeResponse/' + id,
        { responses }
      );

      if (response.data.success) {
        alert('Form submitted successfully');
        // Ensure that both the key and form state are updated
        setForm((prevForm) => ({ ...prevForm, key: new Date() }));
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getValue = (v) => {
    if (v === "radio") {
      return formData[v] || ""; // For radio buttons, return the selected value
    } else {
      return formData[v] || "";
    }
  };

    const handleRadioChange = (checked, text,id) => {

        checked = checked ? 0 : 1;
        radioOptions[id] = checked;
        setFormData({ ...formData, [text]: checked });
        setRadioOptions(radioOptions);
        console.log("radioOptions",radioOptions)

    }

  return (
    <div>
      {forma.fields && (
        <form onSubmit={handleSubmit}>
          {forma.fields.map((field) => (
            <div key={field._id}>
              <label>{field.text}</label>
              {field.type === "radio" ? (
                <input
                  type="radio"
                  name={field.text} // Use the field name as the radio button group name
                  value={field.text}
                  checked={radioOptions[field.id]}
                  onChange={
                    () =>handleRadioChange(radioOptions[field.id], field.text, field.id)
                  }
                />
              ) : (
                <input
                  type={field.type}
                  value={getValue(field.type)} // Provide a default value
                  onChange={(e) =>
                    setFormData({ ...formData, [field.type]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
          <button type="submit">
            Submit
          </button>
        </form>
      )}
       <div key={new Date()}>
        <ViewSubmissions formId={id} />
      </div>
    </div>
  );

    }


export default ViewForm;
