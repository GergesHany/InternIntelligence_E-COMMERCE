const express = require('express');

const router = express.Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    updateUserImage,
    resizeImage,
    changeUserPassword,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deleteLoggedUserData,
} = require('../controllers/userController');

const {
    createUserValidator, 
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
} = require('../utils/validators/userValidator');


const { 
    protect,
    allowedTo 
  } = require('../controllers/authController');

router.route('/').get(getUsers);

router.use(protect);

router.route('/getMe').get(getLoggedUserData, getUserValidator, getUserById);
router.route('/updateMyPassword').put(getLoggedUserData, changeUserPasswordValidator, updateLoggedUserPassword);
router.route('/updateMe').put(getLoggedUserData, updateUserImage, resizeImage, updateLoggedUserData);
router.route('/deleteMe').delete(getLoggedUserData, deleteUserValidator, deleteLoggedUserData);

router.use(allowedTo('admin'));

router.route('/')
    .post(createUserValidator, updateUserImage, resizeImage, createUser)

router.route('/:id')
    .get(getUserValidator, getUserById)
    .delete(deleteUserValidator, deleteUserById)
    .put(updateUserValidator, updateUserImage, resizeImage, updateUserById);

router.route('/changePassword/:id').put(changeUserPasswordValidator, changeUserPassword);

module.exports = router;