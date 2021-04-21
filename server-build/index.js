"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("./bootstrap-globals");
const createExpressHandler_1 = require("./createExpressHandler");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8081;
const app = express_1.default();
app.use(express_1.default.json());
// This server reuses the serverless endpoints from the "plugin-rtc" Twilio CLI Plugin, which is used when the "npm run deploy:twilio-cli" command is run.
// The documentation for this endpoint can be found in the README file here: https://github.com/twilio-labs/plugin-rtc
const tokenFunction = require('@twilio-labs/plugin-rtc/src/serverless/functions/token').handler;
const tokenEndpoint = createExpressHandler_1.createExpressHandler(tokenFunction);
const noopMiddleware = (_, __, next) => next();
const authMiddleware = process.env.REACT_APP_SET_AUTH === 'firebase' ? require('./firebaseAuthMiddleware') : noopMiddleware;
app.all('/token', authMiddleware, tokenEndpoint);
app.use((req, res, next) => {
    // Here we add Cache-Control headers in accordance with the create-react-app best practices.
    // See: https://create-react-app.dev/docs/production-build/#static-file-caching
    if (req.path === '/' || req.path === 'index.html') {
        res.set('Cache-Control', 'no-cache');
    }
    else {
        res.set('Cache-Control', 'max-age=31536000');
    }
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.get('*', (_, res) => {
    // Don't cache index.html
    res.set('Cache-Control', 'no-cache');
    res.sendFile(path_1.default.join(__dirname, '../build/index.html'));
});
app.listen(PORT, () => console.log(`twilio-video-app-react server running on ${PORT}`));
