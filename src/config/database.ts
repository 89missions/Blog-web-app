import mongoose from "mongoose";

export const connectDb = async ()=>{
    try{
        const mongodb_uri = process.env.MONGODB_URI

        if(!mongodb_uri){
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }
        await mongoose.connect(mongodb_uri);

        process.on('SIGINT',async()=>{
            await mongoose.connection.close()
            process.exit(0)
        })

    }
    catch(error){
        throw new Error (`Failed to connect to mongodb: ${error}`)
    }
}

export const disconnectDb = async ()=>{
    try {
        await mongoose.connection.close()
    }catch(error){}
}