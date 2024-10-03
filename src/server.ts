import express from 'express'
import config from './config'
import { parseUserAgent } from './middlewares/useragent';

const app = express();

app.use(express.json());
app.use(parseUserAgent);

app.get('/test', (req, res) => {
    res.json({
        message: `Last login attempted at ${new Date().toLocaleString()} from ${req.useragent}`
    })
})

app.listen(config.server.port || 3000, () => {
    if (config.server.isDev) console.log(`Server reloaded at ${new Date().toLocaleString()}`)
}); 