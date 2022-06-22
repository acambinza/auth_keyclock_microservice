import { Router, Request, Response, NextFunction } from 'express'

import { requiresAuth, claimIncludes } from 'express-openid-connect';


// middleware de autenticacao
const middlewareAuth = async (req: Request, res: Response, next: NextFunction) => {
    next();
}

const routes = Router()
/*
routes.get('/', requiresAuth(), (req: Request, res: Response, next: NextFunction) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})
*/


routes.get('/', (req: Request, res: Response) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

/*
routes.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.oidc.isAuthenticated())
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
    //res.send("Teste login").status(201);
})

routes.get('/profile', async (req, res, next) => {
    console.log(res.oidc)
    res.send(`hello ${req.oidc.user}`);
});

routes.get('/', async (req, res, next) => {
    res.send(`hello ${req.oidc.user}`);
});

routes.post('/isAuth', claimIncludes('roles', 'admin', 'superadmin'), async (req: Request, res: Response, next: NextFunction) => {
    res.send("...")
})
*/

/*
routes.get('/admin', keycloak.protect(), (req: Request, res: Response, next: NextFunction) => {
   
})
*/

// role do reino - "realm:rh"

//realm:gerente - a routa so fica disponivel pra role rh 
/*
routes.get('/reino', keycloak.protect("realm:rh"), (req: Request, res: Response, next: NextFunction) => {
    res.json("reino")
})
*/

// role do client - "colab-auth:rh"
/*
routes.get('/cliente', keycloak.protect("colab-auth:admin"), (req: Request, res: Response, next: NextFunction) => {
    res.json("client")
})
*/

export default routes