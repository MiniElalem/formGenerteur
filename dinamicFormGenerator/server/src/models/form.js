import mongoose from "mongoose";



const formSchema = new mongoose.Schema({
  id:{
    type:Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fields: [
    {
      type: {
        type: String,
        required: true,
      },
      value: {
        type: String,
      },
      text: {
        type: String,
      },
    },
  ],
  submissions: {
    type: Array,
},
});



const Form = mongoose.model("Form", formSchema);

export default Form;
