import mongoose from "mongoose";

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_AUTH_DB } =
  process.env;

const connectToDatabase = async () => {
  try {
    const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:${MONGO_PORT}/${MONGO_AUTH_DB}?authSource=admin`;

    await mongoose.connect(connectionString);

    console.log("Successfully connected to the auth MongoDB database.");
  } catch (error) {
    console.error("Failed to connect to the auth MongoDB database: ", error);
  }
};

export default connectToDatabase;
