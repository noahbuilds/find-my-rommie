import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { initializeApp } from 'firebase/app';
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from 'firebase/storage';
import firebaseConfig from '../configs/firebase.config';
import { injectable } from 'tsyringe';

const FILE_TYPE_MAP: any = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

@injectable()
class ImageService {
    constructor() {}

    public initializeApp = async (req: any) => {
        try {
            initializeApp(firebaseConfig.fireBaseConfig);
            const storage = getStorage();

            const storageRef = ref(
                storage,
                `files/${req.file.originalname + ' ' + Date.now()}`
            );
            const metadata = {
                contentType: req.file.mimetype,
            };

            const snapshot = await uploadBytesResumable(
                storageRef,
                req.file.buffer,
                metadata
            );

            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            return error;
        }
    };

    isFileValid = (req: any): boolean => {
        const isValid = FILE_TYPE_MAP[req.file.mimetype];
        if (isValid != null) {
            return true;
        }
        return false;
    };
}

// console.log(req.user);
// const file = req.file;
// if (!file) return res.status(400).send('No image in the request');
// const fileName = file.filename;
// const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

// const result = await this.userService.updateProfile(req.user.userId, {
//     image: basePath + fileName,
// });

// return res.status(200).send({
//     result,
// });
// console.log(basePath + fileName);

export { ImageService };
