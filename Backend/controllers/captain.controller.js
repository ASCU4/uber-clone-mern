const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res, next) => {

 const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, password, vehicle } = req.body;
    const email = req.body.email.trim().toLowerCase();

        const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }
    
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname || undefined
            },
            email, 
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });
             const token = captain.generateAuthToken();

        const captainResponse = captain.toObject();
        delete captainResponse.password;

        res.status(201).json({ token, captain: captainResponse });          
}  
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const{ password } = req.body;
    const email = req.body.email.trim().toLowerCase();

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();

    res.cookie('token', token);

    const captainResponse = captain.toObject();
    delete captainResponse.password;

    res.status(200).json({ token, captain: captainResponse }); 
}    
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain); 
}
module.exports.logoutCaptain = async (req, res, next) => { 
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }
     
    await blacklistTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successful' });
}



