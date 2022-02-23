import crypto from "crypto";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export default {
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "files",
      format: async (req, file) => file.mimetype.replace("image/", ""),
      public_id: (req, file) =>
        crypto.randomBytes(10).toString("hex") + file.originalname,
    },
  }),
  limits: {
    fileSyze: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const filetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (filetypes.includes(file.mimetype)) {
      return callback(null, true);
    } else {
      return callback(new Error("Error: Images Only!"));
    }
  },
};
