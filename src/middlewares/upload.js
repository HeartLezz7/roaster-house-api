const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const splitName = file.originalname.split(".");
    cb(
      null,
      "" +
        Date.now() +
        Math.random * 100000 +
        "." +
        splitName[splitName.length - 1]
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
