import { Router } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import multerConfig from "../config/multer.js";
import Post from "../models/Post.js";

const routes = Router();

routes.post(
  "/posts",
  multer({ storage: multerConfig.storage }).single("file"),
  async (req, res) => {
    try {
      const { originalname: name, size, filename: key, path } = req.file;
      const post = await Post.create({
        name,
        size,
        key: key.replace("files/", ""),
        url: path,
      });
      return res.json(post).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }
);

routes.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { result: cloudResult } = await cloudinary.uploader.destroy(
      "files/" + id
    );
    if (cloudResult === "ok") {
      const MongoResult = await Post.deleteOne({ key: id });
      return res.json(MongoResult).status(200);
    }
    return res.json({ error: cloudResult }).status(200);
  } catch (error) {
    return res.json(error).status(500);
  }
});

routes.get("/posts", async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
});

export default routes;
