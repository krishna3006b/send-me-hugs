"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const raising_1 = require("../controllers/raising");
const raisingRouter = (0, express_1.Router)();
raisingRouter
    .get('/', raising_1.getRaisings)
    .get('/:id', raising_1.getRaising)
    .post('/', raising_1.createRaising)
    .put('/:id', raising_1.updateRaising)
    .delete('/:id', raising_1.removeRaising)
    .post('/:id', raising_1.makeDonation);
exports.default = raisingRouter;
