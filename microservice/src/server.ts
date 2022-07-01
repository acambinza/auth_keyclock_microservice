import express,{Request, Response, Router} from 'express';
import 'dotenv/config'

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.json';
const routesDoc = Router();

import routes from './routes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs',swaggerUi.serve)
routesDoc.get("/api-docs", swaggerUi.setup(swaggerDocs))

routesDoc.get("/terms", (req: Request, res:Response) => {
    res.send({
        message: "Termos de uso do Micro-Serviço: CETIM-KEYCLOAK"
    })
})

routesDoc.get('/', (req: Request, res: Response) => {
    res.redirect('/api-docs');
});


app.use('/', routesDoc);
app.use("/api/v1/", routes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})


