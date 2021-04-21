"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(require('./serviceAccountKey.json')),
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});
const firebaseAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send();
    }
    try {
        // Here we authenticate users be verifying the ID token that was sent
        const token = yield firebase_admin_1.default.auth().verifyIdToken(authHeader);
        // Here we authorize users to use this application only if they have a
        // Twilio email address. The logic in this if statement can be changed if
        // you would like to authorize your users in a different manner.
        if (token.email && /@twilio.com$/.test(token.email)) {
            next();
        }
        else {
            res.status(401).send();
        }
    }
    catch (_a) {
        res.status(401).send();
    }
});
exports.default = module.exports = firebaseAuthMiddleware;
