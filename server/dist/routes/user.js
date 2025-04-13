"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const middleware_1 = require("../middlewares/middleware");
const userRouter = (0, express_1.Router)();
userRouter
    .get('/all', auth_1.getAllUsers)
    .get('/', middleware_1.authMiddleware, auth_1.getUser)
    .put("/", middleware_1.authMiddleware, auth_1.updateUser)
    .delete('/', middleware_1.authMiddleware, auth_1.removeUser);
exports.default = userRouter;
