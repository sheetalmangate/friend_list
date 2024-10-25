import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';


//create new thought 
export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      
      if (!user) {
         res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      } else {  
        res.json('Created the thought');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
}

//get all thought 
export const getAllThought = async(_req:Request, res: Response) => {

    try {
        const thought = await Thought.find();
        return res.status(200).json(thought);
    } catch(error) {

        console.log(error);
        return res.status(500).json({"message" : "Something wend wrong while fetching thoughts"});
    }
}