const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
        type: String,
        required: true,
        minlength: [ 3, 'First name must be at least 3 characters long'],
     },
      lastname:{
        type: String,
        minlength: [ 3, 'Last name must be at least 3 characters long'],
     }
 },
 email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match:[ /^\S+@\S+\.\S+$/, 'Please provide a valid email address']
 },

    password:{
        type: String,
        required: true,
        select: false,
        minlength: [ 6, 'Password must be at least 6 characters long']
       },
    socketID: {
        type: String,
    },

    status: {
        type: String,
        enum: ['available', 'busy', 'offline'],
        default: 'offline'
    },

    vehicle: {
        color:{
        type: String,
        required: true,
        minlength: [ 3, 'Vehicle color must be at least 3 characters long']
        },
    plate:{
        type: String,
        required: true,
        minlength: [ 3, 'Vehicle plate must be at least 3 characters long']
          },
   capacity:{
       type: Number,
       required: true,
       min: [ 1, 'Vehicle capacity must be at least 1']
            },
    vehicleType:{
        type: String,
        required: true,
        enum: ['car', 'bike', 'auto']  
        }
    },

    location:{
      lat:{
        type: Number,
      },
        lng:{
        type: Number,
      }
    }
})
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn: '24h'});

    return token;
}
captainSchema.methods.comparePassword = async function(password) {
    let isMatch = false;

    try {
        isMatch = await bcrypt.compare(password, this.password);
    } catch (err) {
        isMatch = false;
    }

    if (isMatch) {
        return true;
    }

    if (this.password === password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.constructor.updateOne(
            { _id: this._id },
            { $set: { password: hashedPassword } },
            { runValidators: false }
        );
        this.password = hashedPassword;
        return true;
    }

    return false;
}
captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
