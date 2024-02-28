import express from 'express';
import Restaurant from '../db/restaurant.js';

const router = express.Router();

router.get('/all-vote', async (req, res, next) => {
    try {
        const result = await Restaurant.find({});
        res.status(200).send({
            success: true,
            result: result,
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

router.post('', async (req, res, next) => {
    try {
        const { name, nickname } = req.body;
        if (!nickname) {
            return res.status(400).json({
                success: false,
                result: 'need nickname',
            });
        }
        const restaurant = new Restaurant({ name: name, votes: [] });
        const { _id } = await restaurant.save();

        res.status(201).json({
            success: true,
            result: `created of ${_id}`,
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

router.post('/vote', async (req, res, next) => {
    try {
        const { name, nickname } = req.body;
        if (!name || !nickname) {
            res.status(400).json({ success: false });
        }

        const restaurant = await Restaurant.findOne({ name: name });

        const index = restaurant.votes.indexOf(nickname);

        if (index < 0) {
            restaurant.votes.push(nickname);

            await restaurant.save();

            return res.status(200).json({
                success: true,
                message: 'vote',
            });
        } else {
            restaurant.votes.splice(index, 1);

            await Restaurant.findByIdAndUpdate(restaurant._id, { votes: restaurant.votes });

            return res.status(200).json({
                success: true,
                message: 'unvote',
            });
        }
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

export default router;
