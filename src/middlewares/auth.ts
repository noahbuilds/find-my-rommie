
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configuration from '../configs/configs';

const isLoggedIn = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, configuration.JWT_SECRET as string);
        req.user = verified;
        console.log(req.user);
        next();
    } catch (error: any) {
        // console.log(error)
        res.json({
            err: error,
            msg: error.message,
        });
    }
};

// const setVerifiedUser = (user:any)=>{
//     return user
// }

export { isLoggedIn };
