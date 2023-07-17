import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

export const adminLogin = async (req, res) => {

    const email = 'admin@gmail.com'
    const password = 'admin123'

    try {
        const admin = email === req.body.email
        if (admin) {
            const isPasswordValid = password === req.body.password;

            if (isPasswordValid) {
                const token = jwt.sign({ email: email}, 'myWebAppSecretKey123')
                return res.status(200).json({ message: "Login Sucess", token, admin: email });
            } else {
                return res.json({error: "Wrong password"});
            }
        } else {
            return res.json({ error: "Wrong Email"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email, mobile } = req.body;
        const imageUrl = req.file.filename
        const userData = await User.findOne({ email: req.body.email });
        if (!userData) {
            const user = new User({
                username: username,
                email: email,
                mobile: mobile,
                image: imageUrl,
            });
            const userData = await user.save();
            res.json(userData);
        } else {
            res.json({ message: "Email already taken" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};


export const getUsers = async (req, res) => {
    try {
        const adminData = await User.find().lean()
        res.json(adminData)
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const adminData = await User.findByIdAndDelete({ _id: req.params.id })
        res.json(adminData)
    } catch (error) {
        console.log(error);
    }
}

export const editUser = async (req, res) => {
    try {

        const userData = await User.findById({ _id: req.params.id })
        res.json(userData)
    } catch (error) {
        console.log(error);
    }
}

export const UpdateUser = async (req, res) => {
    try {

        const { username, email, mobile } = req.body
        const userData = {
            username: username,
            email: email,
            mobile: mobile,
        };
        if (req.file?.filename) {
            userData.image = req.file.filename;
        }
        const userDataUpdate = await User.findOneAndUpdate({ _id: req.params.id }, {
            $set: userData
        })
        res.json(userDataUpdate)
    } catch (error) {
        console.log(error);
    }

}