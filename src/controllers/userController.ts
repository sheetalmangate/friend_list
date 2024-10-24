import { Request, Response } from 'express';
import { User } from '../models/index.js';

export const getUsers = async (_req: Request, res: Response) => {
    try {
      res.status(200).json({"message":"display all users"});
    } catch (err) {
      res.status(500).json(err);
    }
}


//create new user
export const createUser = async(req:Request, res:Response ) => {
  
  try {

    const newUSer = await User.create(req.body);
    res.status(201).json(newUSer);

  } catch( error ) {

    console.log(error);
    res.status(500).json({"message":"Something went wrong while creating user"});
  }
}