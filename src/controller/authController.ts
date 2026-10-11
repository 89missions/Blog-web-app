
import type { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import {User} from "../models/users"

//register new user
export const registerUser = async(req:Request,res:Response)=>{
        try{
            const {username,email,password} = req.body as {
                username: string;
                email: string;
                password: string;
            }

            if(!username || !email || !password){
                return res.status(400).json({message:"All fields are required"})
            }

            const existingUser = await User.findOne({email})
            if(existingUser){
                return res.status(400).json({message: "Email is already in use"})
            }

            const passwordHash = await bcrypt.hash(password,10)
            const user = await User.create({username,email,passwordHash})

            const token = jwt.sign({userId: user._id},process.env.JWT_SECRET as string,{expiresIn:"1h"})
            return res.status(201).json({token,user:{id:String(user._id),username,email}})

            
        }catch(error){
            return res.status(500).json({message:"Internal Server Error"})
        }
}