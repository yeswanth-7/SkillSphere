
const { Router} = require('express');
const coursesrouter = Router();
const { userMiddleware } = require('../Middleware/user')
const {Purchase, Courses} = require('../db')


coursesrouter.get('/purchases',userMiddleware,async (req,res)=>{
    const userid = req.userid;
    const courseid = req.body.courseid;
    purchases = await Purchase.create({
        courseid,
        userid
    })
    res.json({
        message: 'User purchases retrieved successfully',
        purchases
    })
})
coursesrouter.post('/purchase',async (req,res)=>{
    const userid = req.userid;
    const courseid = req.body.courseid;
    try{
        const purchases = await Purchase.find({
            userid,
            courseid
        })
        res.json({
            message: 'User purchases retrieved successfully',
           
        });
    }catch(err){
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
})

coursesrouter.get('/preveiw',async (req,res)=>{
    const courses = await Courses.find({});

    res.json({
        message: 'All courses retrieved successfully',
        courses
    })
})

module.exports = {
    coursesrouter : coursesrouter
}