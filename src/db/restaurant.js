import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    votes: [String],
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);

export default Restaurant;
