import { RequestHandler } from 'express';
import UAParser from 'ua-parser-js';

export const parseUserAgent: RequestHandler = (req, res, next) => {
    const ip = req.ip;
    let reqUAString = `IP address ${ip}`

    const userAgentString = req.headers['user-agent'] || '';
    const parser = new UAParser(userAgentString);
    const agent = parser.getResult();
    const browser = `${agent.browser.name} ${agent.browser.version}`;
    const os = `${agent.os.name} ${agent.os.version}`;


    if (userAgentString) reqUAString += ` using ${browser} on ${os}`

    req.useragent = reqUAString;
    next();
}