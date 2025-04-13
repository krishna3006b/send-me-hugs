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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const raising_1 = __importDefault(require("./routes/raising"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const raising_2 = require("./controllers/raising");
const middleware_1 = require("./middlewares/middleware");
const app = (0, express_1.default)();
// MongoDB Connection
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    mongoose_1.default.connect((_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : '')
        .then(() => console.log('Connected Successfully'))
        .catch(err => console.log(err));
}))();
// Middlewares
app.use((0, cors_1.default)())
    .use(express_1.default.json())
    .use('/raising', raising_1.default)
    .use('/auth', auth_1.default)
    .use('/users', user_1.default)
    .post('/withdraw/:id', middleware_1.authMiddleware, raising_2.makeWithdraw)
    .get('/withdraw', middleware_1.authMiddleware, raising_2.getWithdrawals);
// Server Listening
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
