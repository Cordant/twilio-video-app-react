"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressHandler = void 0;
require("dotenv/config");
const twilio_1 = __importDefault(require("twilio"));
const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, TWILIO_CONVERSATIONS_SERVICE_SID } = process.env;
const twilioClient = twilio_1.default(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, {
    accountSid: TWILIO_ACCOUNT_SID,
});
const context = {
    ACCOUNT_SID: TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY_SID,
    TWILIO_API_KEY_SECRET,
    ROOM_TYPE: 'group',
    CONVERSATIONS_SERVICE_SID: TWILIO_CONVERSATIONS_SERVICE_SID,
    getTwilioClient: () => twilioClient,
};
function createExpressHandler(serverlessFunction) {
    return (req, res) => {
        serverlessFunction(context, req.body, (_, serverlessResponse) => {
            const { statusCode, headers, body } = serverlessResponse;
            res
                .status(statusCode)
                .set(headers)
                .json(body);
        });
    };
}
exports.createExpressHandler = createExpressHandler;
