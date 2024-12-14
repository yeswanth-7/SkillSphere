const { Router} = require('express');
const { Admin, Courses } = require('../db');
const adminrouter = Router();
const z = require('zod');
const jwt = require('jsonwebtoken');
const {SECRET_ADMIN_KEY} = require('../config');
const bcrypt = require('bcrypt');
const {adminmiddleware} = require('../Middleware/admin');

adminrouter.get('/', (req,res)=>{
    res.send('Admin Page');
})

adminrouter.post('/signup', async (req, res) => {
    const requiredbody = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(100).refine((password) => {
            const hasLowercase = /[a-z]/.test(password);
            const hasUppercase = /[A-Z]/.test(password);
            return hasLowercase && hasUppercase;
        }, { message: "Password must contain at least one lowercase and one uppercase letter" }),
        firstname: z.string().max(100),
        lastname: z.string().max(100),
    });

    const parseddata = requiredbody.safeParse(req.body);
    if (!parseddata.success) {
        return res.status(400).json({ message: parseddata.error.errors });
    }

    const { email, password, firstname, lastname } = parseddata.data;

    try {
        const hashedpassword = await bcrypt.hash(password, 5);
        await Admin.create({
            email,
            password: hashedpassword,
            firstname,
            lastname,
        });
        res.json({
            message: 'Admin signed up successfully',
            hashedpassword, // Remove this in production; exposing the hash is insecure
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

adminrouter.post('/signin', async (req,res)=>{
    const { email , password} = req.body;
    const admin = await Admin.findOne({
        email
    })
    if(!admin){
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const comparepassword = await bcrypt.compare(password,admin.password);
    if(!comparepassword){
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    if(comparepassword){
        const token = jwt.sign({
            id : admin.id.toString()
        },SECRET_ADMIN_KEY);
        res.json({
            message: 'Admin signed in successfully',
            token
        })

    }else{
        res.status(401).json({ error: 'Invalid email or password' });
    }
    
})

adminrouter.use(adminmiddleware);

adminrouter.get('/courses',async (req,res)=>{
    const adminid = req.userid;

    const { title, description, price, imageurl } = req.body;

    try{ const course = await Courses.create({
        title,
        description,
        price,
        imageurl,
        instructor:adminid
    })

    res.json({
        message: 'Course created successfully',
        course
    })}catch(err){
        res.status(500).json({ error: 'Internal server error', message: err.message })
    }


})

adminrouter.put("/course/edit", async (req,res)=>{
    const adminid = req.userid;

    const { title, description, price, imageurl,courseid } = req.body;

    try{ const course = await Courses.updateOne({
        _id : courseid,
        courseid : adminid // any creator can update this course so we check that adminid and courseid he sending the update
    },{
        title,
        description,
        price,
        imageurl,
        instructor:adminid
    })

    res.json({
        message: 'Course created successfully',
        course
    })}catch(err){
        res.status(500).json({ error: 'Internal server error', message: err.message })
    }

})

adminrouter.get('/bluk',async (req,res)=>{
    const adminid = req.userid;
    const courses = await Courses.find({instructor: adminid})
    res.json({
        message: 'All courses retrieved successfully',
        courses
    })
})

module.exports = {
    adminrouter: adminrouter,
}