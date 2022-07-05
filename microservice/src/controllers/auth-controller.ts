import { Request, Response } from 'express'
import AuthService from '../services/auth-service'; '../services/auth-service';

export default class AuthController {

    static async login(req: Request, res: Response) {

        const { username, password } = req.body

        const rs = await AuthService.login({ "username": username, "password": password });

        if (!rs?.status)
            return res.status(rs?.statusCode).send(rs)
        return res.status(200).send(rs)
    }


    static async refreshToken(req: Request, res: Response) {

        const refreshToken = req.headers.authorization
        const rs = await AuthService.refreshToken({ refreshToken });

        if (!rs?.status)
            res.status(201).send(rs)
        res.status(401).send(rs)

    }

    static async logout(req: Request, res: Response) {

        const refresh_token = req.headers.authorization;
        const rs = await AuthService.logout(refresh_token);

        if (!rs?.status)
            return res.status(401).send(rs)
        return res.status(201).send(rs)
    }


    static async isAuthenticated(req: Request, res: Response) {
        const token = req.headers.authorization
        const rs = await AuthService.isAuthenticated(token);

        if (!rs)
            return res.status(403).send(rs)
        return res.status(201).send(rs)

    }
    
}