"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioResponse = void 0;
class TwilioResponse {
    constructor() {
        this.headers = {};
        this.statusCode = 200;
    }
    setStatusCode(code) {
        this.statusCode = code;
    }
    setBody(body) {
        this.body = body;
    }
    appendHeader(key, value) {
        this.headers[key] = value;
    }
    setHeaders(headers) {
        this.headers = headers;
    }
}
exports.TwilioResponse = TwilioResponse;
const Runtime = {
    getAssets: () => ({
        '/auth-handler.js': {
            path: __dirname + '/auth-handler',
        },
    }),
};
// Bootstrap globals
global.Twilio = require('twilio');
global.Twilio.Response = TwilioResponse;
global.Runtime = Runtime;
