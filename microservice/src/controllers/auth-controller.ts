import { Request, Response } from 'express'
import AuthService from '../services/auth-service'; '../services/auth-service';

export default class AuthController {

    static async login(req: Request, res: Response) {

        const { username, password } = req.body

        const rs = await AuthService.login({ "username": username, "password":password });

        if (rs?.status) {
            res.send(rs).status(201)
        } else {
            res.send(rs).status(rs?.statusCode)
        }
    }

    static async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body
        const rs = await AuthService.refreshToken({ refreshToken });

        if (rs?.status) {
            res.send(rs).status(201)
        } else {
            res.send(rs).status(401)
        }
    }

    static async logout(req: Request, res: Response) {
        const { refresh_token } = req.body
        const rs = await AuthService.logout(refresh_token);

        if (rs?.status) {
            res.send(rs).status(201)
        } else {
            res.send(rs).status(401)
        }
    }

    static async isAuthenticated(req: Request, res: Response) {
        const { token } = req.body
        const rs = await AuthService.isAuthenticated(token);

        if (rs) {
            res.status(201).send(rs)
        } else {
            res.status(403).send(rs)
        }
    }




}