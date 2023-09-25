import mongoose from "mongoose";

const connectDB = async () => {
    const dbUri = process.env.dbURI || '';
    console.log(`[server]: Connecting to DB...`)
    try {
        await mongoose.connect(dbUri);
        console.log(`[server]: Successfully connected to DB`)
    }
    catch (error) {
        console.log(`[server]: Error connecting to DB`);
        console.log(error);
        process.exit(1);
    }

}

export default connectDB;