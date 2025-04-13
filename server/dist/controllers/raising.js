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
exports.getWithdrawals = exports.makeWithdraw = exports.makeDonation = exports.removeRaising = exports.updateRaising = exports.getRaising = exports.getRaisings = exports.createRaising = void 0;
const uuid_1 = require("uuid");
const models_1 = require("../models/models");
const mongoose_1 = __importDefault(require("mongoose"));
const createRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const raising = new models_1.Raising(req.body);
        yield raising.save({ session });
        raising.id = (0, uuid_1.v4)();
        yield raising.save({ session });
        const user = yield models_1.User.findOne({ email: raising.email }).session(session);
        if (!user) {
            return res.status(404).json({ success: false, message: "Failed to authorize user" });
        }
        if (!user.fundraisings) {
            user.fundraisings = [];
        }
        // @ts-ignore
        user.fundraisings.push(raising._id);
        yield user.save({ session });
        yield session.commitTransaction();
        session.endSession();
        res.status(201).json({ success: true, raising });
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Failed to list fundraising' });
    }
});
exports.createRaising = createRaising;
const getRaisings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raisings = yield models_1.Raising.find();
        if (raisings) {
            res.status(201).json({ "success": true, raisings });
        }
        else {
            res.status(404).json({ "success": false, "message": "No raisings" });
        }
    }
    catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' });
    }
});
exports.getRaisings = getRaisings;
const getRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raising = yield models_1.Raising.findOne({ id: req.params.id }).populate('donors.user', 'firstName email dp').exec();
        if (raising) {
            res.status(201).json({ "success": true, raising });
        }
        else {
            res.status(404).json({ "success": false, "message": "No raising" });
        }
    }
    catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' });
    }
});
exports.getRaising = getRaising;
const updateRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let raising = yield models_1.Raising.findOne({ id: id });
        if (raising) {
            raising = yield models_1.Raising.findOneAndUpdate({ id: id }, req.body, { returnDocument: 'after' });
            raising === null || raising === void 0 ? void 0 : raising.save().then(() => { return res.status(200).json({ "Success": true, "message": "raising updated successully", "raising": raising }); }).catch((err) => { return res.status(404).json({ "Success": "false", "message": "Failed to save raising", "error": (err instanceof Error) ? err.message : 'Some error occurred' }); });
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" });
        }
    }
    catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to update raising", err: err });
    }
});
exports.updateRaising = updateRaising;
const removeRaising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let raising = yield models_1.Raising.findOne({ id: id });
        if (raising) {
            raising = yield models_1.Raising.findOneAndDelete({ id: id });
            res.status(200).json({ "Success": true, "message": raising });
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" });
        }
    }
    catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch raising" });
    }
});
exports.removeRaising = removeRaising;
const makeDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, amount } = req.body;
    try {
        let raising = yield models_1.Raising.findOne({ id });
        if (!raising) {
            return res.status(404).json({ success: false, message: 'Raising not found' });
        }
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        //@ts-ignore
        raising.donors.push({ user: user._id, amount });
        raising.amountDonated = raising.amountDonated + amount;
        if (raising.amountDonated >= raising.amount)
            raising.isCompleted = true;
        yield raising.save();
        raising = yield models_1.Raising.findOne({ id }).populate('donors.user', 'firstName email dp').exec();
        res.status(200).json({ success: true, message: 'Raising updated successfully', raising });
    }
    catch (err) {
        // Handle unexpected errors
        res.status(500).json({ success: false, message: 'Failed to update raising', error: (err instanceof Error) ? err.message : 'An unexpected error occurred' });
    }
});
exports.makeDonation = makeDonation;
const makeWithdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { amount, status } = req.body;
    const email = req.email;
    try {
        const raising = yield models_1.Raising.findOne({ id });
        if (!raising) {
            return res.status(404).json({ success: false, message: 'Raising not found' });
        }
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const withdrawal = new models_1.Withdrawal({
            amount,
            fundraising: raising._id,
            status,
            user: user._id
        });
        yield withdrawal.save();
        //@ts-ignore
        user.withdrawals.push(withdrawal._id);
        yield user.save();
        raising.amountWithdrawn = raising.amountWithdrawn + amount;
        yield raising.save();
        const updatedRaising = yield models_1.Raising.findOne({ id }).populate('donors.user', 'firstName email dp').exec();
        res.status(200).json({ success: true, message: 'Withdrawal request created successfully', withdrawal, raising: updatedRaising });
    }
    catch (err) {
        // Handle unexpected errors
        res.status(500).json({ success: false, message: 'Failed to process withdrawal', error: (err instanceof Error) ? err.message : 'An unexpected error occurred' });
    }
});
exports.makeWithdraw = makeWithdraw;
const getWithdrawals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        const user = yield models_1.User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const withdrawals = yield models_1.Withdrawal.find({ user: user._id }).exec();
        if (withdrawals.length > 0) {
            res.status(200).json({ success: true, withdrawals });
        }
        else {
            res.status(404).json({ success: false, message: 'No withdrawals found' });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: (err instanceof Error) ? err.message : 'Some error occurred' });
    }
});
exports.getWithdrawals = getWithdrawals;
