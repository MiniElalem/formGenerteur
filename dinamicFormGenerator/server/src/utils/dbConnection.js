const url = "mongodb+srv://minielalem:79R7Dgxev9NMMy2a@cluster0.19i6pvg.mongodb.net/FormApp?retryWrites=true&w=majority";
const urgUrl="mongodb://127.0.0.1:27017/formApp?retryWrites=true&w=majority";
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(urgUrl);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


export default connectDB;
