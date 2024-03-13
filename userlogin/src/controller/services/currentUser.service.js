const currentUser = async (req, res,next) => {
    try {
    res.json({id:req.user.id, username:req.user.username});
      
    } catch (error) {
      next(error)
    }
  };

 module.exports = currentUser;