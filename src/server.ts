import express from 'express'
import config from './config'
import { parseUserAgent } from './middlewares/useragent';
import router from './routes';
import { globalErrorHandler } from './middlewares/globalError';

const app = express();

app.use(express.json());
app.use(parseUserAgent);
app.use(router);
app.use(globalErrorHandler);

app.listen(config.server.port || 3000, () => {
    if (config.server.isDev) console.log(`Server reloaded at ${new Date().toLocaleString()}`)
}); 