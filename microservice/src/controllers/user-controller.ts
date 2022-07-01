import e, { Request, Response } from 'express'
import UserService from '../services/user-service';

import {
    initialUserCreate,
    initialUserCredential,
} from '../all-interface';


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

    static async userCreate(req: Request, res: Response) {

        const { access_token, refresh_token } = req.headers;
        const {
            username,
            email,
            firstName,
            lastName,
            groups,
            password
        } = req.body;

        const data = {
            ...initialUserCreate,
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            groups: [groups],
            credentials: [{
                ...initialUserCredential,
                value: password
            }]
        }

        const rs = await UserService.userCreate(data, access_token);

        if (!rs.status)
            res.status(rs.statusCode).json(rs)
        res.status(201).json({ ...data, id: rs })

    }

    static async userUpdate(req: Request, res: Response) {

        const { access_token, refresh_token } = req.headers;
        const {
            username,
            email,
            firstName,
            lastName,
            groups,
            password
        } = req.body;

        const data = {
            ...initialUserCreate,
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            groups: [groups],
            credentials: [{
                ...initialUserCredential,
                value: password
            }]
        }

        const { id } = req.params

        const rs = await UserService.userUpdate(id, data, access_token);

        if (!rs.status)
            res.status(rs.statusCode).json(rs)
        res.status(201).json({ ...data, id: id })

    }

    static async userEnableOrDesable(req: Request, res: Response) {

        const { access_token, refresh_token } = req.headers;
        const { id } = req.params

        const { enabled } = req.body;

        
        const data = {
            enabled: enabled
        }
        
        console.log(enabled,data)
        
        const rs = await UserService.userUpdate(id, data, access_token);

        if (!rs.status)
            res.status(rs.statusCode).json(rs)
        res.status(201).json({ ...data, id: id })

    }

    static async userList(req: Request, res: Response) {

        const { access_token, refresh_token } = req.headers

        const rs = await UserService.userList(access_token);

        if (rs.status)
            res.status(201).send(rs)
        res.status(401).send(rs)

    }

    static async userListByEmailOrId(req: Request, res: Response) {

        const { access_token, refresh_token } = req.headers;
        const { params } = req.params

        const rs = await UserService.userListByEmailOrId({ params: params, token: access_token });

        if (!rs.status)
            res.status(401).send(rs)
        res.status(200).send(rs)

    }


    static testRoles(req: Request, res:Response){
        res.send('Route  liberada ... ').end()
    }


}