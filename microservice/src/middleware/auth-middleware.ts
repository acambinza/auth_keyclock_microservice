import { rejects } from 'assert';
import { SrvRecord } from 'dns';
import { Request, Response, NextFunction } from 'express';
import { userInfo } from 'os';

import AuthService from '../services/auth-service';
import UserService from '../services/user-service';


interface groupsProtect {
    value: 'admin-realm' | 'colab' | 'rh'
}

interface realmProtect {
    value: 'admin-realm' | 'colab' | 'rh'
}

interface applicationProtect {
    value:  'create-user'| 'list-user'
}

interface protectBody {
    realmRoles?: string[]
    applicationRoles?: string[]
    groups?: string[]
}

export function params(params?:protectBody ): any {
    console.log(params)
    return []
}

const verifyRoles = (req: Request,res: Response,next:NextFunction, access_token: any) => {
    console.log('Em construção... Verificação das ROLES')
    return false;
}

export const protect =  async (req: Request, res: Response, next: NextFunction) => {
 
    const access_token = req.headers.access_token;

    const rs = await AuthService.isAuthenticated(access_token)
    if (!rs.status) 
        res.status(401).end("User not authorized");
    
    if(!verifyRoles(req,res,next, access_token))
        res.status(401).end("User Roles not authorized");

    next();
}



/*
export const protectAdmin = async (req: Request, res: Response, next: NextFunction, token: any) => {

    const user = await UserService.userInfo(token)
    if (user.status) {
        const userGroups = await UserService.userOneGroups({ id: user.data?.sub, token: token })

        if (userGroups.status) {
            let rs = userGroups.data.map(item => item.name === 'admin-realm')[0]

            if (rs)
                next()
            else
                res.status(401).send("User not authorized");
        } else {
            res.status(403).send(user.message);
        }
    } else {
        res.status(401).send(user.message)
    }
}

export const protectRH = async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.headers.access_token;

    const user = await UserService.userInfo(access_token)

    if (user.status) {
        const userGroups = await UserService.userOneGroups({ id: user.data?.sub, token: access_token })

        if (userGroups.status) {
            let rs = userGroups.data.map(item => item.name === 'rh')[0]

            if (rs)
                next()
            else
                res.status(401).send("User not authorized");
        } else {
            res.status(403).send(userGroups.message);
        }
    } else {
        res.status(403).send(user.message);
    }
}


export const protectColab = async (req: Request, res: Response, next: NextFunction) => {

    const access_token = req.headers.access_token;

    const user = await UserService.userInfo(access_token)
    if (user.status) {
        const userGroups = await UserService.userOneGroups({ id: user.data?.sub, token: access_token })

        if (userGroups.status) {
            let rs = userGroups.data.map(item => item.name === 'colab')[0]

            if (rs)
                next()
            else
                res.status(401).send("User not authorized");
        } else {
            res.status(401).send(userGroups.message);
        }
    } else {
        res.status(403).send(user.message);
    }
}

*/