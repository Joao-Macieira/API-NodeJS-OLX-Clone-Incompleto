const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require("./validators/AuthValidator");
const UserValidator = require('./validators/UserValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');

router.get('/ping', (req, res) => {
    res.json({pong:true});
});

router.get('/states', UserController.getStates); // List States

router.post('/user/signin', AuthValidator.signin, AuthController.signin); // Login
router.post('/user/signup', AuthValidator.signup, AuthController.signup); // Cadastrar

router.get('/user/me', Auth.private, UserController.info); // Get user info
router.put('/user/me',UserValidator.editAction, Auth.private, UserController.editAction); // Edit user infomations

router.get('/categories', AdsController.getCategories); //Get all categories

router.post('/ad/add', Auth.private, AdsController.addAction); //Add a new Ad
router.get('/ad/list', AdsController.getList); // Get all Ads
router.get('/ad/item', AdsController.getItem); // Get a especific Ad
router.post('/ad/:id', Auth.private, AdsController.editAction); //Alter Ad informations

module.exports = router;