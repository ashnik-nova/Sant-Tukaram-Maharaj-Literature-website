import { Admin } from '../models/admin.model.js';
import { ApiError } from '../utils/ApiError.js';


const createAdmin = async ({fullname, password, email, adminCode}) => {
    if(!fullname || !password || !email || !adminCode) {
        throw new ApiError(400, "All fields are necessary.");
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        throw new ApiError(400, "Admin with this email already exists.");
    }

    const admin = await Admin.create({
        fullname:fullname,
        email,
        password,
        adminCode,
    });

    return admin;
}

export default createAdmin;