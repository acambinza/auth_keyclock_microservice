import { Router, Request, Response, NextFunction } from 'express'
import axios from 'axios';
import { createCipheriv } from 'crypto';

import { api } from '../config/axios-api';

export default class UserKeycloak {

    static async logoutUser(token: string) {
        try {
            const tokenSet = await axios.get('http://localhost:8000/auth/realms/LITLE_SOFT/protocol/openid-connect/revoke', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return tokenSet;
        } catch (e) {
            console.log('erro>> ', e)
        }

    }

}
