import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
// import bcrypt from 'bcryptjs'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        return console.log(err) 
    }
    if (existingUser) {
        return res.status(400).json({massage: "User Already Exists! Login Instead"})
    }
    // const hashedPAss = bcrypt.hashSync(password)
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password
    });

    try {
        user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({user});
}

const readUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ error }))
}

const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }))
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.authorId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
}

export default { createUser, readUser, readAllUsers, updateUser, deleteUser }