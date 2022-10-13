const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateauthtoken } = require("../config/generateAuthToken.js");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            var userPassword = user.password;
        }
        else {
            throw new Error("Invalid Credentials");
        }
        const match = await bcrypt.compare(password, userPassword)
        if (user && match) {
            const token = generateauthtoken(user._id);
            res.cookie("jwtoken", token, {
                expires: new Date(Date
                    .now() + 2592000000), httpOnly: false,
            });
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
            });
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(403).json(error.message);
    }

}


const register = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        let user
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please Enter all the Feilds");
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(409);
            throw new Error("User already exists");
        }
        user = await User.create({ name, email, password });
        const token = generateauthtoken(user._id);
        res.cookie("jwtoken", token, {
            expires: new Date(Date
                .now() + 2592000000), httpOnly: false
        });

        if (user) {
            res.json(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token:token
                }
            )
        }
        else
            throw new Error("user not created");
    } catch (error) {
        res.json(error.message)
    }

}


const checkcookie = async (req, res) => {
    let token = req.cookies.jwtoken;
    if (token !== undefined){
    const decoded = jwt.verify(token, process.env.Secret_key);
    data = await User.findById(decoded.userId).select("-password");
    res.json(data);
    }

    else res.status(200).json();


}
const removecookie = (req, res) => {
    res.clearCookie('jwtoken',{path:"/"})
    res.status(200).json("cookie cleared")
}


module.exports = { login, register,checkcookie,removecookie}