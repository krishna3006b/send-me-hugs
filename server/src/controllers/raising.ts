import { v4 as uuidv4 } from 'uuid';
import { Raising, User, Withdrawal } from '../models/models';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from '../types';

export const createRaising = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const raising = new Raising(req.body);
        await raising.save({ session });

        raising.id = uuidv4();
        await raising.save({ session });

        const user = await User.findOne({ email: raising.email }).session(session);
        if (!user) {
            return res.status(404).json({ success: false, message: "Failed to authorize user" });
        }

        if (!user.fundraisings) {
            user.fundraisings = [];
        }

        // @ts-ignore
        user.fundraisings.push(raising._id);
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ success: true, raising });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Failed to list fundraising' });
    }
}

export const getRaisings = async (req: Request, res: Response) => {
    try {
        const raisings = await Raising.find();

        if (raisings) {
            res.status(201).json({ "success": true, raisings })
        } else {
            res.status(404).json({ "success": false, "message": "No raisings" });
        }

    } catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' })
    }
}

export const getRaising = async (req: Request, res: Response) => {
    try {
        const raising = await Raising.findOne({ id: req.params.id }).populate('donors.user', 'firstName email dp').exec();

        if (raising) {
            res.status(201).json({ "success": true, raising })
        } else {
            res.status(404).json({ "success": false, "message": "No raising" });
        }

    } catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' })
    }
}

export const updateRaising = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let raising = await Raising.findOne({ id: id })
        if (raising) {
            raising = await Raising.findOneAndUpdate({ id: id }, req.body, { returnDocument: 'after' })
            raising?.save()
                .then(() => { return res.status(200).json({ "Success": true, "message": "raising updated successully", "raising": raising }) })
                .catch((err) => { return res.status(404).json({ "Success": "false", "message": "Failed to save raising", "error": (err instanceof Error) ? err.message : 'Some error occurred' }) })
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" })
        }

    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to update raising", err: err })
    }
}

export const removeRaising = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let raising = await Raising.findOne({ id: id })
        if (raising) {
            raising = await Raising.findOneAndDelete({ id: id })
            res.status(200).json({ "Success": true, "message": raising })
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch raising" })
    }
}

export const makeDonation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, amount } = req.body;

    try {
        let raising = await Raising.findOne({ id });
        if (!raising) {
            return res.status(404).json({ success: false, message: 'Raising not found' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        //@ts-ignore
        raising.donors.push({ user: user._id, amount });

        raising.amountDonated = raising.amountDonated + amount;
        
        if (raising.amountDonated >= raising.amount)
            raising.isCompleted = true;

        await raising.save();

        raising = await Raising.findOne({ id }).populate('donors.user', 'firstName email dp').exec()

        res.status(200).json({ success: true, message: 'Raising updated successfully', raising });

    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({ success: false, message: 'Failed to update raising', error: (err instanceof Error) ? err.message : 'An unexpected error occurred' });
    }
};

export const makeWithdraw = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const { amount,status } = req.body;
    const email = req.email;

    try {
        const raising = await Raising.findOne({ id });
        if (!raising) {
            return res.status(404).json({ success: false, message: 'Raising not found' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const withdrawal = new Withdrawal({
            amount,
            fundraising: raising._id,
            status,
            user: user._id
        });

        await withdrawal.save();

        //@ts-ignore
        user.withdrawals.push(withdrawal._id);
        await user.save();

        raising.amountWithdrawn = raising.amountWithdrawn  + amount;

        await raising.save();

        const updatedRaising = await Raising.findOne({ id }).populate('donors.user', 'firstName email dp').exec();

        res.status(200).json({ success: true, message: 'Withdrawal request created successfully', withdrawal, raising: updatedRaising });

    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({ success: false, message: 'Failed to process withdrawal', error: (err instanceof Error) ? err.message : 'An unexpected error occurred' });
    }
};

export const getWithdrawals = async (req: CustomRequest, res: Response) => {
    try {
        const email = req.email;

        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const withdrawals = await Withdrawal.find({ user: user._id }).exec();

        if (withdrawals.length > 0) {
            res.status(200).json({ success: true, withdrawals });
        } else {
            res.status(404).json({ success: false, message: 'No withdrawals found' });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: (err instanceof Error) ? err.message : 'Some error occurred' });
    }
};
