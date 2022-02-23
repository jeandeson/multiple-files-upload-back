import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://jubileu:123456A@learn-cluster.5hmei.mongodb.net/file-uploads?retryWrites=true&w=majority";

export default async function connect() {
  await mongoose.connect(connectionString);
}
