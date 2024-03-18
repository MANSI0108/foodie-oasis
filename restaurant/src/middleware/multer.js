const multer = require("multer")

const storage = multer.diskStorage({
    destination:  function (res, file, cb) {
        return cb(null, "./src/uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

module.exports = upload;