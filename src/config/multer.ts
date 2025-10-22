import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType =
      req.body?.uploadType || req.headers["x-upload-type"] || "product";
    const uploadPath = path.join("uploads", uploadType);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const customName = req.body?.filename;
    const ext = path.extname(file.originalname);
    const finalName = customName
      ? `${customName}${ext}`
      : `${file.fieldname}-${Date.now()}${ext}`;

    cb(null, finalName);
  },
});

export const upload = multer({ storage });
