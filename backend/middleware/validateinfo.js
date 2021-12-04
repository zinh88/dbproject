module.exports = (req, res, next) => {
    const email = req.body.mail;
    const pass = req.body.pass;

    const validEmail = (email) => {
        return /[\w\.]+@lums\.edu\.pk/.test(email)
    }
    if(req.path === '/signup') {
        const name = req.body.name;
        if(![email,pass,name].every(Boolean)) {
            return res.status(401).json({ message: "Missing Credentials"} );
        } else if (!validEmail(email)) {
            return res.status(401).json({ message: "Invalid Email"} );
        }
    } else if (req.path === '/login') {
        if(![email,pass].every(Boolean)) {
            return res.status(401).json({ message: "Missing Credentials"} );
        } else if (!validEmail(email)) {
            return res.status(401).json({ message: "Invalid Email"} );
        }
    }
    next();
};