import { Router, Request, Response, NextFunction } from 'express'

import { Issuer } from 'openid-client'

//@ts-ignore
import axios from 'axios';

import { keycloak } from '/keycloak'

// middleware de autenticacao
const middlewareAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenSet = await axios.get('http://localhost:8000/auth/realms/CETIM-AUTH/protocol/openid-connect/userinfo', {
            headers: {
                'Authorization': `${req.headers.authorization}`
            }
        });

        if (tokenSet.status == 200)
            next();
        return res.json({ status: false, data: "Request failed with status code 401" }).status(401)

    } catch (err) {
        return res.json({ status: false, data: err })
    }
}


const routes = Router()

routes.get('/', middlewareAuth, (req: Request, res: Response, next: NextFunction) => {
    res.json("microservice with keycload")
})


routes.post('/logar', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const keycloakIssuer = await Issuer.discover(
            'http://localhost:8000/auth/realms/CETIM-AUTH',
        );

        const client = new keycloakIssuer.Client({
            client_id: 'colab-v2', // Same as `clientId` passed to client.auth()
            token_endpoint_auth_method: 'none', // to send only client_id in the header
        });

        // Use the grant type 'password'
        let tokenSet = await client.grant({
            grant_type: 'password',
            client_secret: 'g1Wr1M985P6jVKX8vxWQzmNUcHb6zCwM',
            username: 'acambinza',
            password: 'un1b3la7'
        });


        const tokenSetUser = await axios.get('http://localhost:8000/auth/realms/CETIM-AUTH/protocol/openid-connect/userinfo', {
            headers: {
                'Authorization': `Bearer ${tokenSet.access_token}`
            }

        });

        return res.json({ status: true, accessToken: tokenSet.access_token, refreshToken: tokenSet.refresh_token, userData: tokenSetUser.data })

    } catch (err) {
        console.log('error', err)
    }

})


routes.post('/isAuth', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const tokenSet = await axios.get('http://localhost:8000/auth/realms/CETIM-AUTH/protocol/openid-connect/userinfo', {
            headers: {
                'Authorization': `${req.headers.authorization}`
            }

        });

        if (tokenSet.status == 200)
            return res.json({ status: true, data: tokenSet.data })
        return res.json({ status: false, data: tokenSet.status }).sendStatus(401)

    } catch (err) {
        return res.json({ status: false, data: err })
    }
})


routes.get('/admin', keycloak.protect(), (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    console.log(req.kauth.grant.access_token)

    //@ts-ignore
    console.log('user_logado', req.kauth.grant.id_token.content)

    //@ts-ignore
    res.json({ "user-logado": req.kauth.grant.id_token.content })
})


// role do reino - "realm:rh"

//realm:gerente - a routa so fica disponivel pra role rh 
routes.get('/reino', keycloak.protect("realm:rh"), (req: Request, res: Response, next: NextFunction) => {
    res.json("reino")
})

// role do client - "colab-auth:rh"
routes.get('/cliente', keycloak.protect("colab-auth:admin"), (req: Request, res: Response, next: NextFunction) => {
    res.json("client")
})



export default routes