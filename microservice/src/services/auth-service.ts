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
                password: password,
            });

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


    static async logout({ token }: userToken) {
        try {
            const { kcClient } = await init();

            const tokenSet = await kcClient.revoke(token)

            console.log(tokenSet)

            if (tokenSet == undefined) {
                const dadaRs = {
                    status: true,
                    accessToken: null,
                    refreshToken: null,
                    userData: []
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

    static async isAuthenticated({ token }: userToken) {

        try {
            const { kcClient } = await init();

            const userInfo = await kcClient.userinfo(token)

            if (userInfo == undefined) {
                const dadaRs = {
                    status: true,
                    accessToken: null,
                    refreshToken: null,
                    userData: userInfo
                }
                return dadaRs
            }else{
                const dadaRs = {
                    status: false,
                    accessToken: null,
                    refreshToken: null,
                    userData: []
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






}