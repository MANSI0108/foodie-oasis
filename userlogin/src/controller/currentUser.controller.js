const currentUser = async (req, res,next) => {
    try {
  
    res.json({id:req.user.id, username:req.user.username, role:req.user.role});
      
    } catch (error) {
      next(error)
    }
  };

 module.exports = currentUser;