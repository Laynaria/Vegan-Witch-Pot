const fs = require("fs");

const uploadAvatars = (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;

  fs.rename(
    `./public/uploads/avatars/${filename}`,
    `./public/uploads/avatars/${id}.jpg`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
};

module.exports = {
  uploadAvatars,
};
