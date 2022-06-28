import { Request, Response } from 'express'
import UserService from '../services/user-service';

export default class UserController {

    static async userInfo(req: Request, res: Response) {

        const { token } = req.body
        const info = await UserService.userInfo(token);
   
        if (info.status) {
            res.send(info).status(201)
        } else {
            res.status(401).send(info)
        }
    }


}