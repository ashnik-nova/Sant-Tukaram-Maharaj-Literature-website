import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
    fullname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Please use a valid Gmail address'],
    },
    password: {
        type: String,
        required: true,
    },
    adminCode:{
        type:String,
        required:true
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { timestamps: true });


adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

adminSchema.pre('save', async function (next) {
    console.log("Pre-save hook running for adminCode...");
    if (this.isModified('adminCode')) {
      this.adminCode = await bcrypt.hash(this.adminCode, 10);
      console.log("Hashed adminCode:", this.adminCode);
    }
    next();
  });
  


adminSchema.methods.compareAdminCode = async function (adminCode) {
    console.log(adminCode, this.adminCode);
    console.log("Comparing adminCode...");
    return await bcrypt.compare(adminCode, this.adminCode);
}

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: 'admin',
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            lastActivity: Date.now(),
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

adminSchema.methods.generateOTPToken = function (otp) {
    return jwt.sign(
        {
            otp: otp,
            email: this.email,
        },
        process.env.OTP_TOKEN_SECRET,
        {
            expiresIn: process.env.OTP_TOKEN_EXPIRY,
        }
    );
};

export const Admin = mongoose.model('Admin', adminSchema);