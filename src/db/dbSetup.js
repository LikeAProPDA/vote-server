import mongoose from 'mongoose';
const dbSetUp = async (host, username, password, collection) => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${collection}`, {
            retryWrites: true,
            w: 'majority',
        });

        console.log('Mongo DB Connected!');
    } catch (err) {
        console.error(err);
    }
};

export default dbSetUp;
