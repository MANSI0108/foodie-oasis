const currentUser = async (req, res, next) => {

  res.json({ id: req.user.id, username: req.user.username, role: req.user.role });

};

module.exports = currentUser;