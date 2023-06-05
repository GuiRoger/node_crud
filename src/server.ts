import express from "express";
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const app = express();
app.use(express.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use("/v1",router)

app.listen(Number(process.env.PORT),()=> console.log('Server is running...'));


