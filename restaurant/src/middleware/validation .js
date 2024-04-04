

const handleRegisterData = async (req, res, next) => {
    const { name, email, address, lat, long } = req.body;

    const profile = req.file.filename;
    const created_by = req.user.id;
    const updated_by = req.user.id;
    const role = req.user.role

    if (!name || !profile || !email || !address || !created_by || !updated_by || !lat || !long) {

        const err = new Error("Some fields are missing");
        err.statusCode = 400;
        next(err);
    }

    else{
        if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
            const err = new Error("Email is not valid")
            err.statusCode = 400;
            next(err);
        }
    
        if (role != "owner") {
            const err = new Error("You Are Not a Owner")
            err.statusCode = 401
            next(err)
        }
        next()
    }

  
};



module.exports = { handleRegisterData }