import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI as string)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Error while connecting to db Error:", Error);
    process.exit(1);
  }
};
export default connectDB;
