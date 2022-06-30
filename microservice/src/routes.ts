import { Router, Request, Response, NextFunction } from 'express'

import AuthController from './controllers/auth-controller';
import UserController from './controllers/user-controller';

const routes = Router();

/** WELLCOME ROUTE */
routes.get('/', (req: Request, res: Response) => {
    res.send('wellcome to microservice of authentication... v1.0.0 - Cetim Tecnologia');
});

/** AUTH ROUTE */
routes.post('/login', AuthController.login)
routes.post('/logout', AuthController.logout)
routes.post('/refresh_token', AuthController.refreshToken)
routes.post('/is_authenticated', AuthController.isAuthenticated)

/** USER ROUTE */
routes.post('/user_info', UserController.userInfo);
routes.post('/user_create', UserController.userCreate);
routes.get('/user_list', UserController.userList);
routes.get('/user_list_one/:params', UserController.userListByEmailOrId);
routes.post('/user_update/:id', UserController.userUpdate);
routes.post('/user_enable_desable/:id', UserController.userEnableOrDesable);


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