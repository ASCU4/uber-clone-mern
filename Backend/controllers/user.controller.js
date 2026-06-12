const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({errors: error.array() });
    }


      const { fullname, password} = req.body;
      const email = req.body.email.trim().toLowerCase();

      const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    } 

      const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
        });
       const token = user.generateAuthToken(); 
       const userResponse = user.toObject();
       delete userResponse.password;

       res.status(201).json({ token, user: userResponse });
}
module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
   if(!error.isEmpty()) {
    return res.status(400).json({errors: error.array() });
   }


const { password } = req.body;
const email = req.body.email.trim().toLowerCase();

const user = await userModel.findOne({ email }).select('+password');

if (!user) {
  return res.status(401).json({ message: 'Invalid email or password'});
}

const isMatch = await user.comparePassword(password);

if(!isMatch) {
  return res.status(401).json({ message: 'Invalid email or password'});
}
const token = user.generateAuthToken();

res.cookie('token', token);

const userResponse = user.toObject();
delete userResponse.password;

res.status(200).json({ token, user: userResponse }); 
};
module.exports.getuserprofile = async (req, res, next)=> {

  res.status(200).json(req.user);
}
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

   if (!token) {
    return res.status(400).json({ message: 'Token not found' });
   }
    
   await blackListTokenModel.create({ token});

  res.status(200).json({ message: 'Logged out successfully' });
}
