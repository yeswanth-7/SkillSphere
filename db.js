const mongoose = require('mongoose');
const {Schema, ObjectId } = require('mongoose');

mongoose.connect("mongodb+srv://bunny:Iamyash@cluster0.ulb7n.mongodb.net/course-selling-application");

const userSchema = new mongoose.Schema({
    email : {type: String, unique: true},
    password : String,
    firstname : String,
    lastname : String
    
})

const adminSchema = new mongoose.Schema({
    email : {type: String, unique: true}, 
    password : String,
    firstname : String,
    lastname : String
})

const coursesSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageurl : String,
    instructor : { type: ObjectId, ref: 'User' }
})

const purchaseSchema = new mongoose.Schema({
    courseid: { type: ObjectId, ref: 'Course' },
    userid: { type: ObjectId, ref: 'User' }
});


const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Courses = mongoose.model('Course', coursesSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    User,
    Admin,
    Courses,
    Purchase,
}