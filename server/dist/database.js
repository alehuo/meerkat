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
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.DB_URI) {
        throw new Error('DB_URI is undefined');
    }
    const uri = process.env.DB_URI;
    const mongoose = yield mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    const connection = mongoose.connection;
    connection.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Connected to database');
    }));
    connection.on('error', () => {
        console.log('Error connecting to database');
    });
});
exports.disconnect = () => {
    mongoose_1.default.disconnect();
};
