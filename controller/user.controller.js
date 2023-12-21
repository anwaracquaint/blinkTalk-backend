import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).send({ message: "Incorrect Email or Password", success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ success: false, message: "Incorrect Username or Password" });
        } else {
            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "24h" });

            await User.updateOne({ _id: user._id }, { token: token });

            const userData = JSON.parse(JSON.stringify(user));

            delete userData.password;

            const updatedData = {
                ...userData,
                token
            }
            return res.status(200).send({ success: true, message: "User logged in successfully", data: updatedData, });
        }



    } catch (error) {
        console.log("error: ", error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error, while trying to login',
            error,
        });
    }
}

const registerHandler = async (req, res) => {
    try {

        const { username, email, password, role, phone } = req.body;

        const usernameCheck = await User.findOne({ username });

        if (usernameCheck) {
            return res.status(409).send({ message: "Username already used", success: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(409).send({ message: "Email already used", success: false });
        }

        const phoneCheck = await User.findOne({ phone });
        if (phoneCheck) {
            return res.status(409).send({ message: "Phone already used", success: false });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            username,
            role,
            password: hashedPassword,
            phone
        });

        delete user.password;


        return res.status(200).send({ success: true, message: "User Created Successfully", data: user, });


    } catch (error) {
        console.log("error: ", error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error, while trying to login',
            error,
        });
    }
}


export { loginHandler, registerHandler }