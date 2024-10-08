import express from 'express';
import { Types } from 'mongoose';
import { User } from '../models/user';

const router = express.Router();

router.get('/profile/@me', async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Not authenticated');
    }
});

router.get('/profile/bookmarks', async (req, res) => {
    if (req.isAuthenticated()) { 
        // @ts-ignore - _id always exists on the User object despite TypeScript not recognizing it
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send({ bookmarkedInternships: user.bookmarkedInternships });
    } else {
        res.status(401).send('Not authenticated');
    }
});

router.post('/profile/bookmarks', async (req, res) => {
    if (req.isAuthenticated()) {
        // @ts-ignore - _id always exists on the User object despite TypeScript not recognizing it
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Add the bookmark
        user.bookmarkedInternships.push(req.body.internshipId);
        await user.save();

        res.status(200).send({ bookmarkedInternships: user.bookmarkedInternships });
    }
});

router.delete('/profile/bookmarks', async (req, res) => {
    if (req.isAuthenticated()) {
        // @ts-ignore - _id always exists on the User object despite TypeScript not recognizing it
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Remove the bookmark
        user.bookmarkedInternships = user.bookmarkedInternships.filter((id) => id.toString() !== req.body.internshipId);
        await user.save();

        res.status(200).send({ bookmarkedInternships: user.bookmarkedInternships });
    }
});

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id;

    // Validate the ID so it doesn't crash the server if it's invalid
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID');
    }
    
    // Find the user
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Remove sensitive information
    const userObj = user.toObject() as any; // Convert to any so that we can delete properties
    delete userObj.email;
    delete userObj.password;
    delete userObj.salt;

    res.status(200).send(userObj);
});


export { router as profileRouter };