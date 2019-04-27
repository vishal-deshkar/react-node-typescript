import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import setRoutes from './routes';

const app = express();
const BUILD_PATH = path.join(__dirname, "../..","build");

app.use(logger('dev'));
app.use(express.static(BUILD_PATH))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
setRoutes(app);

app.get('/*', (req:any, res:any, next:any)=> {
    res.sendFile(path.join(BUILD_PATH, 'index.html'));
});
app.listen(3001, () => console.log(`server listening on port 3001`));

export { app };