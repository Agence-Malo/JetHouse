import * as mongo from "mongoose";

const mongoose = mongo.createConnection(process.env.MONGO_URI!, {
  dbName: "website",
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
});

export default mongoose;
