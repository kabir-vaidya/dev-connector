const router = require('express').Router();

const authRoutes = require('./components/auth/routes')
const userRoutes = require('./components/user/routes')
const profileRoutes = require('./components/profile/routes')
const postsRoutes = require('./components/posts/routes')

router.use("/user", userRoutes);
router.use("/posts", postsRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

module.exports = router;