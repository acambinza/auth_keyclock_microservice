import { init } from '../keycloak';

import {
    userLoginInterface,
    userRefreshToken,
    userToken
} from '../all-interface'

export default class AuthService {

    static async login({ username, password }: userLoginInterface) {

        try {
            const { grantType, kcClient } = await init();

            const tokenSet = await kcClient.grant({
                grant_type: grantType,
                username: username,
                password: password
            });


            console.log(tokenSet)

            const userInfo = await kcClient.userinfo(tokenSet);

            if (tokenSet && userInfo)
                return {
                    status: true,
                    accessToken: tokenSet.access_token,
                    refreshToken: tokenSet.refresh_token,
                    userData: userInfo,
                    statusCode: 200
                }
            else
                return {
                    status: true,
                    accessToken: tokenSet.access_token,
                    refreshToken: tokenSet.refresh_token,
                    userData: userInfo,
                    statusCode: 403
                }
        } catch (e: any) {
            console.log("catch >> ", e)
            return {
                status: false,
                statusCode: e.response.status,
                accessToken: null,
                refreshToken: null,
                userData: [],
                message: JSON.stringify(e)
            }
        }
    }


    static async refreshToken({ refreshToken }: userRefreshToken) {
        try {
            const { kcClient } = await init();

            const tokenSet = await kcClient.refresh(refreshToken)

            const userInfo = await kcClient.userinfo(tokenSet);

            if (tokenSet && userInfo) {
                const dadaRs = {
                    status: true,
                    accessToken: tokenSet.access_token,
                    refreshToken: tokenSet.refresh_token,
                    userData: userInfo
                }
                return dadaRs
            }

        } catch (e) {
            const dadaRs = {
                status: false,
                accessToken: null,
                refreshToken: null,
                userData: [],
                message: JSON.stringify(e)
            }
            return dadaRs
        }
    }


    static async logout(refresh_token: string) {
        try {
            const { kcClient } = await init();

            const tokenSet = await kcClient.revoke(refresh_token)

            if (tokenSet == undefined) {
                return {
                    status: true,
                    accessToken: null,
                    refreshToken: null,
                    userData: []
                }
            } else {
                return {
                    status: true,
                    accessToken: null,
                    refreshToken: null,
                    userData: [],
                    message: new Error("Erro logout user")
                }
            }

        } catch (e) {
            const dadaRs = {
                status: false,
                accessToken: null,
                refreshToken: null,
                userData: [],
                message: JSON.stringify(e)
            }
            return dadaRs
        }
    }

    static async isAuthenticated(token: string) {

        try {
            const { kcClient } = await init();

            const userInfo = await kcClient.userinfo(token)

            if (userInfo != undefined)
                return { status: true };

            return { status: false };

        } catch (e) {
            return {
                status: false,
                message: JSON.stringify(e)
            }
        }

    }

}