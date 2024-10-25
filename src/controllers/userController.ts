import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

//get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json("Unable to fetch Users");
    }
}

//get single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts');

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
    } else {
      res.json(user);
    }
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

//delete user by its id 
export const deleteUser = async( req:Request, res:Response ) => {

  try {

    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and his Thoughts are deleted!' })
    return;

  } catch {
    res.status(500).json({"message": "Something wend wrong while deleteing user and his Thoughts"});
    return;
  }
}

//update users
export const updateUser = async( req:Request, res:Response  ) => {

  try {

    const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
      { $set: req.body },
      {runValidators: true, new: true}
    );

    if(!user) {
      return res.status(404).json({message:"Unable to update user at this time"});
    }

    return res.status(200).json(user);

  } catch(error) {

    console.log(error);
    return res.status(500).json({"error":"Something went wrong "});
  }
}