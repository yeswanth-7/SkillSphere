const { Router} = require('express');
const userrouter = Router();
const z = require('zod');
const bcrypt = require('bcrypt');
const { User, Purchase, Courses } = require("../db");
const jwt = require('jsonwebtoken');


const {SECRET_USER_KEY} = require('../config');
const { userMiddleware } = require('../Middleware/user');
userrouter.post('/signup',async (req,res)=>{
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
        await User.create({
            email,
            password: hashedpassword,
            firstname,
            lastname,
        });
        res.json({
            message: 'User signed up successfully',
            hashedpassword, // Remove this in production; exposing the hash is insecure
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
})
userrouter.post('/signin',async (req,res)=>{
    const { email , password} = req.body;
    const user = await User.findOne({
        email
    })
    const comparepassword = await bcrypt.compare(password,user.password);
    if(!comparepassword){
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    if(comparepassword){
        const token = jwt.sign({
            id : user.id.toString()
        },SECRET_USER_KEY);
        res.json({
            message: 'User signed in successfully',
            token
        })

    }else{
        res.status(401).json({ error: 'Invalid email or password' });
    }
})

userrouter.use(userMiddleware);
userrouter.get("/purchases", async (req, res) => {
    const userid = req.userid; // Set in userMiddleware

    try {
        // Fetch purchases based on user ID
        const purchases = await Purchase.find({ userid });

        if (!purchases.length) {
            return res.status(404).json({ message: 'No purchases found for this user' });
        }

        const courseIds = purchases.map((purchase) => purchase.courseid);

        const coursedata = await Courses.find({ _id: { $in: courseIds } });

        res.json({ purchases, coursedata });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = {
    userrouter: userrouter
}