import { CLIENT_PROFILE } from './../routes/authRoutes';
import {Request, Response, NextFunction} from "express"
import bcrypt from "bcryptjs";
import moment from "moment";
import passport from "passport";

import { User } from "../models/user";
import { SocialAccount } from './../models/socialAccount';
import { EmailVerification } from "../models/emailVerification";
const Mailer = require("../utils/mailer");

class AuthController { 

    // Handling User Register Functionality
    static async register(req: Request, res: Response): Promise<Response> {
        try {
            //Destructuring values from request body
            const { name, email, password } = req.body;

            const userExist = await User.findOne({where: {email}});

            if (userExist) {
                return res.json({
                    status: false,
                    message: "User already exists."
                });
            }

            // Hashing password using bcrypt
            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync(req.body.password, salt);

            // Creating user with provided info
            const register = await User.create({
                name,
                email,
                password: hashedPassword
            });
    
            // Return response if register successfully
            if (register) {
                Mailer.sendVerificationEmail(email);
                return res.json({
                    status: true,
                    message: "Successfully Registered"
                });
            }

            // Return response if register fails
            return res.json({
                status: false,
                message: "Something went wrong"
            }); 
        } catch (error) {
            throw error;
        }
    }

    // Handling User Login Functionality
    static login(req: Request, res: Response, next: NextFunction) {
        try {
            passport.authenticate('local', (err, user, info) => {
                if (err != null) {
                    return res.json({
                        status: false,
                        message: err
                    });
                }

                req.logIn(user, (err) => {
                    if (err) return next(err);
                    return res.json({
                        status: true,
                        message: "Successfully logged in.",
                        data: user
                    });
                });
                
            })(req, res, next);

        } catch (error) {
            throw error;
        }
    }

    // Handling user logout
    static logout(req: Request, res: Response): Response {
        req.logout();
        return res.json({
            status: true,
            message: "Successfully logged out."
        });
    }

    // Handling email verification
    static async verifyEmail(req: Request, res: Response) {
        const { token } = req.query;

        // Check whether token exists in db
        const tokenExist = await EmailVerification.findOne({
           where: {
               token
           } 
        });
        
        // if token doesn't exist response with error
        if (tokenExist == null) {
            return res.json({
                status: false,
                message: "Invalid token provided"
            });
        }

        // if token already expired response with error
        if (moment().isAfter(moment(tokenExist.expires_at))) {
            return res.json({
                status: false,
                message: "Token has expired"
            });
        }

        const user = await User.findOne({
            where: {
                email: tokenExist.email
            }
        });

        if (user == null) {
            return res.json({
                status: false,
                message: "Something went wrong"
            });
        }

        // Update user to be verified
        await user.update({email_verified_at: moment()});
        await tokenExist.update({expires_at: moment()});

        return res.redirect("http://localhost:3000/?verified=true");
    }

    // Handling social login link
    static async connect(req: any, res: Response) {
        await SocialAccount.create({
            social_id: req.account.id,
            user_id: req.user.id,
            display_name: req.account.name,
            social_provider: req.account.provider 
        });

        res.redirect(CLIENT_PROFILE+"&provider="+req.account.provider);
    }

}

module.exports = AuthController;