const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/upload-image', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let image = req.files.file;

    image.mv(__dirname + `/../client/public/${image.name}`, function (err) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({
            success: true,
            image: '/' + image.name
        });
    })
})
module.exports = router;