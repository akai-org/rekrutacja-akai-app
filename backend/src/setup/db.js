import mongoose from 'mongoose';

export async function createDBConnection() {
    const DB_HOSTNAME = process.env.DB_HOSTNAME;
    const DB_USERNAME = process.env.DB_USERNAME;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_PORT = process.env.DB_PORT;
    const DB_NAME = process.env.DB_NAME;
    try {
        const connectionString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`;
        await mongoose.connect(connectionString)
        console.log(`connected to database`);
    } catch(err) {
        console.log('error connecting to database: ', err);
        throw err;
    }
}
