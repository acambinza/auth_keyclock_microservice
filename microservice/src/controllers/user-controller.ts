import e, { Request, Response } from 'express'
import UserService from '../services/user-service';

import {
    initialUserCreate,
    initialUserCredential,
} from '../all-interface';


export default class UserController {

    static async userInfo(req: Request, res: Response) {

        const token = req.headers.authorization;
        const info = await UserService.userInfo(token);

        if (info.status) {
            res.send(info).status(201)
        } else {
            res.status(401).send(info)
        }
    }

    static async userCreate(req: Request, res: Response) {

        const access_token = req.headers.authorization;


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
            res.status(401).send(rs.message)

        const userInfo = await UserService.usersInfo(access_token, rs.data)

        const dataReturn = {
            ...initialUserCreate,
            id: rs.data,
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            groups: [groups],
            credentials: [],
            ...userInfo.data
        }

        if (!rs.status)
            res.status(rs.statusCode).send(rs)
        res.status(201).send(dataReturn)


    }

    static async userUpdate(req: Request, res: Response) {

        const access_token = req.headers.authorization;
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
            res.status(401).send(rs.message)


        const userInfo = await UserService.usersInfo(access_token, rs.data)


        const dataReturn = {
            ...initialUserCreate,
            id: rs.data,
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            groups: [groups],
            credentials: [],
            ...userInfo.data
        }

        if (!rs.status)
            res.status(rs.statusCode).send(rs)
        res.status(201).send(dataReturn)

    }


    static async userEnableOrDesable(req: Request, res: Response) {

        const access_token = req.headers.authorization;
        const { id } = req.params

        const { enabled } = req.body;

        const data = {
            enabled: enabled
        }

        const rs = await UserService.userUpdate(id, data, access_token);

        if (!rs.status)
            res.status(rs.statusCode).json(rs)
        res.status(201).json({ ...data, id: id })

    }

    static async userList(req: Request, res: Response) {

        const access_token = req.headers.authorization

        const userList = await UserService.userList(access_token);

        if (!userList.status)
            res.status(401).send(userList)

        let rs = []

        for await (let element of userList.data) {
            let roles = await UserService.usersInfo(access_token, element.id)

            if (roles.status) {
                //@ts-ignore
                element.roles = roles.data.roles;
                //@ts-ignore
                element.groups = roles.data.groups;
            }

            rs.push(element);
        }

        res.status(200).send(rs)
    }


    static async userListByEmailOrId(req: Request, res: Response) {

        const access_token = req.headers.authorization

        const { params } = req.params

        const rs = await UserService.userListByEmailOrId({ params: params, token: access_token });

        if (!rs.status)
            res.status(401).send(rs)

        const { id } = rs.data[0]

        let roles = await UserService.usersInfo(access_token, id)

        if (roles.status) {
            //@ts-ignore
            rs.data[0].roles = roles.data.roles;
            //@ts-ignore
            rs.data[0].groups = roles.data.groups;
        }

        res.status(200).send(rs)

    }


    static testRoles(req: Request, res: Response) {
        res.send('Route  liberada ... ');
    }


}