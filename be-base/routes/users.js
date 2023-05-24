const express = require('express');
const USER = require('../controllers/usersController');
const AUTH = require('../middlewares/auth');
const router = express.Router();

router.get('/get', USER.getUser);
router.get('/me', AUTH.auth, USER.me);
router.post('/update-info', AUTH.auth, USER.updateInfo);
router.post('/register', USER.register);
router.post('/login', USER.login);
router.post('/logout', AUTH.auth, USER.logout);
router.post('/change-password', AUTH.auth, USER.changePassword);
router.post('/set-role', AUTH.auth, AUTH.role(AUTH.ROLE.ADMIN), USER.setRole);

router.get('/test', AUTH.auth, (req, res) => {
    res.status(200).json({message: 'success'});
});

router.get('/test2', AUTH.auth, AUTH.role(AUTH.ROLE.ADMIN), (req, res) => {
    res.status(200).json({message: 'success'});
});
module.exports = router;
