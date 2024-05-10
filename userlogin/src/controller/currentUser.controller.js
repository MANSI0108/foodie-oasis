const jwt = require('jsonwebtoken');
const user = async (req, res, next) => {

  res.json({ id: req.user.id, username: req.user.username, role: req.user.role });

};

const currentUser = async (req, res, next) => {

  const token = req.cookies.gitUser;

  // const token = req.token;

  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (user) {

    res.json({ username: user.gitUser.login, bio: user.gitUser.bio, avatar: user.gitUser.avatar_url, });

  } else {
    res.redirect('/login')
  }
}

module.exports = { user, currentUser };