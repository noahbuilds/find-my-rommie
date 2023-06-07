import multer from 'multer';
import path from 'path';
import fs from 'fs';

const FILE_TYPE_MAP: any = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const destinationFolder = 'public/uploads';

fs.access(destinationFolder, (err) => {
    if (err) {
        // Folder does not exist, create it
        fs.mkdir(destinationFolder, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
                console.error('Error creating folder:', mkdirErr);
            } else {
                // Folder created successfully
                console.log('created folder');
            }
        });
    } else {
        // Folder already exists
        console.log('folder exists');
    }
});

//file storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError: any = new Error('invalid image type');
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, path.join(destinationFolder));
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

export default storage;
