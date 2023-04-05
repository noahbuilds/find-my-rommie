import { Response, Request } from "express"

const userController = {
    getUsers:async (req:Request, res: Response) => {
         res.json({
            message: 'get users'
         })
    }
}


export {userController}