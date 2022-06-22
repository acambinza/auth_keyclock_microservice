import express, {Request, Response} from 'express';

import routes from './routes';

import { auth } from 'express-openid-connect';

import 'dotenv/config'

import cors from 'cors';

const app = express()

app.use(cors());
app.use(express.json())

app.use(auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    authRequired: false,
    auth0Logout: true
}))

app.get('/', (req: Request, res: Response) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.use(routes)

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})


