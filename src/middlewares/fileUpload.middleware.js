import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/resume/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    req.session.jobId = req.body.id;
    req.session.resume = name;
    cb(null, name);
  },
});
export const uploadFile = multer({
  storage: storageConfig,
});
