let multer = require("multer"),
  multerStorageObject = multer.diskStorage({
    destination: "./public/userprofileImage/",
    filename: (req, file, cb) => {
      const fileBreakdown = file.mimetype.split("/");

      if (fileBreakdown[0] === "image") {
        cb(null, "API" + Date.now() + "." + fileBreakdown[1]);
      } else cb(null, false, { message: req.flash("Wrong File type") });
    },
  });

function checkFileType(file, cb) {
  const types = /jpeg|jpg|png|gif/;
  const fileBreakdown = file.mimetype.split("/");
  const extnames = types.test(fileBreakdown[1].toLowerCase());
  const mimetype = types.test(file.mimetype);

  if (extnames && mimetype) return cb(null, true);
  else cb("Wrong File Type");
}

const uploadImage = multer({
  storage: multerStorageObject,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("image");

module.exports = { uploadImage };
