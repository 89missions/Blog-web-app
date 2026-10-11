
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

//login a user

export const loginUser = async(req:Request,res:Response)=>{
    try{
        const {email,password} = req.body as {
            email: string;
            password: string;
        }
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }

        const ok = await bcrypt.compare(password, user.passwordHash)
        if(!ok){
            return res.status(401).json({message:"Invalid credentials"})
        }

        const token = jwt.sign(
            {userId: String(user._id),username:user.username, email:user.email},
            process.env.JWT_SECRET as string,{expiresIn:"7d"})

            return res.status(201).json({
                token,
                user: {
                    id: String(user._id),
                    username: user.username,
                    email: user.email
                }
            });
    
    }
    catch(error){

    }
}