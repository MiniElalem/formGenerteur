import { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  MenuItem,
  Modal,
  Typography,
  Select,
  Radio,
  RadioGroup
} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./buildform.css";
import axios from "axios";
import ResponsiveAppBar from "../components/Appbar";
const Form = () => {

  const [form, setForm] = useState({ name: "", description: "", fields: []});
  const [open, setOpen] = useState(false);
  let index = 0;
  let widgetTyp="";
  const [newOption, setNewOption] = useState('');
  const [radioOptions, setRadioOptions] = useState([]);
  const [showFormControlLabels, setShowFormControlLabels] = useState([]);
  const [formValid, setFormValid] = useState(true);


  function handleRadioClick(index) {
    let fields = form.fields;
    fields[index].value = fields[index].value === 0 ? 1 : 0;
    setForm({ ...form, fields });
    setShowFormControlLabels(showFormControlLabels);
  }

const handleOptionInputChange = (e) => {
  setNewOption(e.target.value);
};
function handleAddOption(index) {


  let fields = form.fields;
  fields[index].text = newOption;


  //add an index to showFormControlLabels
  showFormControlLabels[index] = true;
  setShowFormControlLabels(showFormControlLabels);


  setForm({ ...form, fields });
  setNewOption("");
}
  function handleOnDrag(e, widgetType) {
    console.log(e);
    widgetTyp=widgetType;
    console.log("Widget Type: ", widgetType);
    e.dataTransfer.setData("ve", widgetType);
  }

  function handleOnDrop(e) {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData("ve");
    console.log("Widget Type: ", widgetTyp);
    let fields = form.fields;
    if (widgetType === "radio") {
      fields.push({ type: widgetTyp, value: [] });
    } else {
      fields.push({ type: widgetTyp, value: "" });
    }
    setForm({ ...form, fields });
  }

  function handleOnDragOver(e) {
    e.preventDefault();
  }
  function handleOnChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleOnDelete(index) {
    let fields = form.fields;
    fields.splice(index, 1);
    setForm({ ...form, fields });
  }
  function handleOnFieldChange(e, index) {
    let fields = form.fields;
    switch (fields[index].type) {
        case "radio":
          fields[index].value = fields[index].value === 0 ? 1 : 0;
          break;
      default:
        // For other field types, update the value directly
        fields[index].value = e.target.value;
    }

    setForm({ ...form, fields });
  }

  function handleOnOpen() {
    setOpen(true);
  }
  function handleOnClose() {
    setOpen(false);
  }

  function handleOnSave(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setFormValid(false);
      alert('Please enter a form name before saving.');
      return;
    }

    axios.post("http://localhost:5000/api/forms/create", form).then((res) => {
      console.log(res.data);
      alert("Form saved successfully");
    });
    setOpen(false);
  }


  function createFieldLabel(field, index) {
    let fields = form.fields;
    switch (field.type) {
      case "text":
        return (
          <TextField
            label="Text"
            variant="outlined"
            name="text"
            value={field.value}
            onChange={(e) => handleOnFieldChange(e, index)}
          />
        );
      case "email":
        return (
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={field.value}
            onChange={(e) => handleOnFieldChange(e, index)}
          />
        );
      case "password":
        return (
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            value={field.value}
            onChange={(e) => handleOnFieldChange(e, index)}
          />
        );
      case "number":
        return (
          <TextField
            label="Number"
            variant="outlined"
            name="number"
            value={field.value}
            onChange={(e) => handleOnFieldChange(e, index)}
          />
        );
        case "radio":
  return (
    <div className="form-builder-right-body-fields-item-body-item" key={index}>
      {!showFormControlLabels[index] ? (
        <div>
          <input
            type="text"
            name={`radio-text-${index}`}
            value={newOption}
            onChange={handleOptionInputChange}
          />
          <Button onClick={() => {
            handleAddOption(index);
          }}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      ) : (
        <div>
        <FormControlLabel
          value={form.fields[index].text}
          control={<Radio checked={form.fields[index].value === 1} onClick={() => handleRadioClick(index)} />}
          label={form.fields[index].text}
        />
        </div>
      )}
    </div>
  );
    }
  }


  return (
    <div className="form-builder">
      <div className="form-builder-left">
        <div className="form-builder-left-header">
          <h3>Form Builder</h3>
        </div>
        <div className="form-builder-left-body">
          <div
            className="form-builder-left-body-item"
            draggable
            onDrag={(e) => handleOnDrag(e, "text")}
          >
            <p>Text</p>
          </div>
          <div
            className="form-builder-left-body-item"
            draggable
            onDrag={(e) => handleOnDrag(e, "email")}
          >
            <p>Email</p>
          </div>
          <div
            className="form-builder-left-body-item"
            draggable
            onDrag={(e) => handleOnDrag(e, "password")}
          >
            <p>Password</p>
          </div>
          <div
            className="form-builder-left-body-item"
            draggable
            onDrag={(e) => handleOnDrag(e, "number")}
          >
            <p>Number</p>
          </div>
          <div
            className="form-builder-left-body-item"
            draggable
            onDrag={(e) => handleOnDrag(e, "radio")}
          >
            <p>Radio</p>
          </div>
        </div>
      </div>
      <div className="form-builder-right">
        <div className="form-builder-right-header">
          <div className="form-builder-right-header-input">
            <TextField
              label="Form Name"
              variant="outlined"
              name="name"
              value={form.name}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="form-builder-right-header-input">
            <TextField
              label="Form Description"
              variant="outlined"
              name="description"
              value={form.description}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="form-builder-right-header-actions">
            <Button variant="contained" onClick={(e) => handleOnOpen(e)}>
              Save
            </Button>
          </div>
        </div>
        <div
          className="form-builder-right-body"
          onDragOver={(e) => handleOnDragOver(e)}
          onDrop={(e) => handleOnDrop(e)}
        >
          <div className="form-builder-right-body-header">
            <h3>{form.name}</h3>
            <p>{form.description}</p>
          </div>
          <div className="form-builder-right-body-fields">
            {form.fields.map((field, index) => (
              <div className="form-builder-right-body-fields-item" key={index}>
                <div className="form-builder-right-body-fields-item-header">
                  <h4>{field.type}</h4>
                  <div className="form-builder-right-body-fields-item-header-actions">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleOnDelete(index)}
                    />
                  </div>
                </div>
                <div className="form-builder-right-body-fields-item-body">
                  {createFieldLabel(field, index)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={(e) => handleOnClose(e)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Paper
            sx={{
              width: "500px",
              padding: "20px",
            }}
          >
            <Typography variant="h5">Save Form</Typography>
            <TextField
              label="Form Name"
              variant="outlined"
              name="name"
              value={form.name}
              onChange={(e) => handleOnChange(e)}
            />
            <TextField
              label="Form Description"
              variant="outlined"
              name="description"
              value={form.description}
              onChange={(e) => handleOnChange(e)}
            />
            <Button variant="contained" onClick={(e) => handleOnSave(e)}>
              Save
            </Button>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
}
export default Form;
