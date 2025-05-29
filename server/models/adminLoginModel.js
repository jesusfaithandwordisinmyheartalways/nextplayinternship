



import mongoose from 'mongoose';



const adminLoginSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i
    }
    });

    const AdminLoginUser = mongoose.model('admin', adminLoginSchema, 'admin');
    export default AdminLoginUser;