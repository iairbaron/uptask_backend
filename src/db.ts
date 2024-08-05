import  colors  from "colors";
import mongoose, { connection } from "mongoose";
import {exit} from "node:process"


export const connectDB =  async ()=>{
    try{
        const conection = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${conection.connection.host}${conection.connection.port}`
        console.log(colors.magenta.bold("succesful conecction: "+ url));
    }
    catch(error){
        console.log(error.message);
        console.log(colors.red.bold("Error coneccting Mongodb"))
        exit
    }
}