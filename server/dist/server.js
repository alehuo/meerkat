"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = require("path");
const database_1 = require("./database");
const MongoDBStore = require('connect-mongodb-session')(express_session_1.default);
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is undefined');
}
if (!process.env.DB_URI) {
    throw new Error('DB_URI is undefined');
}
if (!process.env.PORT) {
    throw new Error('PORT is undefined');
}
const port = parseInt(process.env.PORT, 10);
const app = express_1.default();
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
});
store.on('error', function (error) {
    console.log(error);
});
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
app.use(helmet_1.default({
    contentSecurityPolicy: false
}));
app.use(express_1.default.static(path_1.join(__dirname, '..', '..', 'client', 'build')));
app.get('/health', (_req, res) => res.sendStatus(200));
app.all('/*', (_req, res) => res.sendFile(path_1.join(__dirname, '..', 'client', 'build', 'index.html')));
database_1.connect().then(() => {
    app.listen(port, () => console.log(`App listeting on port ${port}`));
}).catch(err => {
    console.error(err);
});
