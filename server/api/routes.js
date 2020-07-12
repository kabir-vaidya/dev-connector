const router = require('express').Router();

const authRoutes = require('./components/auth/routes')
const userRoutes = require('./components/user/routes')
const profileRoutes = require('./components/profile/routes')
const postsRoutes = require('./components/posts/routes')

router.use("/api/users", userRoutes);
router.use("/api/posts", postsRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/profile", profileRoutes);