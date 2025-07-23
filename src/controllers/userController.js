import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(password);

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists !' });
        let hashPass = await bcrypt.hash(password, 10);
        console.log(hashPass);
        const createNewUser = { 'name': name, 'email': email, 'password': hashPass };
        const createUser = await User.create(createNewUser);
        res.status(200).json({ createUser });
    }
    catch (err) {
        console.log(err);

    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.status(404).json({ message: 'User not found' });
        const match = await bcrypt.compare(password, checkUser.password);
        if (match) {
            const accessToken = jwt.sign(
                { "email": checkUser.email },
                process.env.ACCESS_TOCKEN_SECRET,
                { expiresIn: '60s' }
            );
            //  const refreshToken = jwt.sign(
            //     {"username": checkUser.email},
            //     process.env.REFRESH_TOCKEN_SECRET,
            //     {expiresIn: '1d'}
            //  );
            res.status(200).cookie("accessToken", accessToken, { httpOnly: true, secure: true }).json({ accessToken })
        }
        else {
            return res.status(401).json({ message: 'invalid password' });

        }
    }
    catch (err) {
        console.log(err);

    }

}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        console.log(deletedUser);

        if (deletedUser) {
            res.status(200).json('User deleted !');
        }
        else {
            res.status(404).json({ message: 'User not found!' })
        }
    }
    catch (err) {
        console.log(err);

    }
}


const logout = async (req, res) => {
    res.clearCookie('accessToken')
    return res.status(200).json('user logout successfully!')
}


export { userRegister, loginUser, deleteUser, logout };