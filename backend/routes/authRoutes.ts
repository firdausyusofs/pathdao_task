import { SocialAccount } from './../models/socialAccount';
import passport from 'passport';
import express, {Request, Response, Router} from "express";

const AuthController = require("../controllers/authController");

const router: Router = express.Router();

export const CLIENT_BASE_URL = "http://localhost:3000"
const CLIENT_SOCIAL_LOGIN = CLIENT_BASE_URL + "/social-login";
export const CLIENT_PROFILE = CLIENT_BASE_URL + "/profile?linked=true";
const CLIENT_PROFILE_ERROR = CLIENT_BASE_URL + "/profile?linked=false"

// Email verify route
router.get('/email/verify', AuthController.verifyEmail);

// Auth routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/logout', AuthController.logout);

// Google login routes
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {successRedirect: CLIENT_SOCIAL_LOGIN}), (req: Request, res: Response) => {
});
router.get('/connect/google', passport.authorize('google-auth'));
router.get('/connect/google/callback', passport.authorize('google-auth', {successRedirect: CLIENT_PROFILE + "&provider=google"}), AuthController.connect);

// Facebook login routes
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: CLIENT_SOCIAL_LOGIN}), (req: any, res: Response) => {
});
router.get('/connect/facebook', passport.authorize('facebook-auth'));
router.get('/connect/facebook/callback', passport.authorize('facebook-auth', {failWithError: true, successRedirect: CLIENT_PROFILE + "&provider=facebook"}), AuthController.connect, (err: any, req: any, res: any, next: any) => {
    res.redirect(CLIENT_PROFILE_ERROR+"&error="+err)
});

// Discord login routes
router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', passport.authenticate('discord', {successRedirect: CLIENT_SOCIAL_LOGIN}), (req: any, res: Response) => {
});
router.get('/connect/discord', passport.authorize('discord-auth'));
router.get('/connect/discord/callback', passport.authorize('discord-auth', {failWithError: true, passReqToCallback: true}), AuthController.connect, (err: any, req: any, res: any, next: any) => {
    res.redirect(CLIENT_PROFILE_ERROR+"&error="+err) 
});

// Github login routes
router.get('/auth/github', passport.authenticate('github'));
router.get('/connect/github', passport.authorize('github-auth'));
router.get('/auth/github/callback', (req: any, res: Response, next: any) => {
    if (req.user) {
        passport.authorize('github-auth', {successRedirect: "http://localhost:3000/profile"})(req, res, next);
    } else {
        passport.authenticate('github', {successRedirect: CLIENT_SOCIAL_LOGIN})(req, res, next);
    }
});

router.get('/auth/social/success', (req: any, res: Response,) => {
    if (req.user) {
        res.json({
            status: true,
            message: "User successfully login",
            user: req.user
        });
    }
});

export default router;