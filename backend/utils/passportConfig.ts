const localStrategy = require("passport-local").Strategy;
const googleStrategy = require("passport-google-oauth20").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const githubStrategy = require("passport-github2").Strategy;
import { Profile as GithubProfile } from "passport-github2";
import { Profile as GoogleProfile } from "passport-google-oauth20";
import { Profile as FacebookProfile } from "passport-facebook";
import { Strategy, Profile, VerifyCallback, Scope } from '@oauth-everything/passport-discord';
import bcrypt from "bcryptjs";
require('dotenv').config();

import { User } from "../models/user";
import { SocialAccount } from "../models/socialAccount";

const authenticate = async (name: string, email: string, provider: string, displayName: string, id: any, cb: any) => {
    const user = await User.findOne({ where: {email}});

    if (user != null) {
        let socialAccount = await SocialAccount.findOne({ where: { social_provider: provider, social_id: id, user_id: user.id } });

        if (socialAccount == null) {
            cb("No user found with this social account", null);
        } else {
            let data = {
                id: user!.id,
                name: user!.name,
                email: user!.email
            };
            cb(null, data);
        }

    } else {
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(email+id, salt);
        let newUser = await User.create({
            name: displayName,
            email,
            password: hashedPassword
        });

        await SocialAccount.create({
            user_id: newUser.id,
            social_id: id,
            display_name: displayName,
            social_provider: provider
        });

        let data = {
            id: newUser.id,
            name: name!,
            email
        };
        cb(null, data);
    }
}

const connect = async (id: any, provider: string, displayName: string, cb: any) => {
    let user = await SocialAccount.findOne({ where: {social_id: id} });

    if (user != null) {
        cb("This account already been associated.", false);
    } else {
        let data = {
            id: id,
            name: displayName,
            provider: provider
        }
        cb(null, data);
    }
}

module.exports = function(passport: any) {

    passport.use(
        new localStrategy({usernameField: 'email'}, async (email: string, password: string, cb: any) => {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (user == null || !bcrypt.compareSync(password, user.password)) {
                cb("User not found or password mismatched.", null);
            } else if (user.email_verified_at == null) {
                cb("Please verify your email first", null);
            } else {
                let data = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                cb(null, data);
            }
        })
    );

    passport.use(
        new googleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/callback",
        }, async (accessToken: any, refreshToken: any, profile: GoogleProfile, cb: any) => {
            let email = profile.emails![0].value;
            authenticate(profile.displayName, email, profile.provider, profile.displayName, profile.id, cb);
        })
    );

    passport.use('google-auth', 
        new googleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/connect/google/callback",
            scope: ['profile', 'email']
        }, async (accessToken: any, refreshToken: any, profile: GoogleProfile, cb: any) => {
            connect(profile.id, profile.provider, profile.displayName, cb);
        })
    );

    passport.use(
        new facebookStrategy({
            clientID: `${process.env.FACEBOOK_APP_ID}`,
            clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
            callbackURL: "/api/v1/auth/facebook/callback",
            profileFields: ['displayName', 'email']
        }, async (accessToken: any, refreshToken: any, profile: FacebookProfile, cb: any) => {
            let email = profile.emails![0].value;
            authenticate(profile.displayName, email, profile.provider, profile.displayName, profile.id, cb);
        })
    );

    passport.use('facebook-auth', 
        new facebookStrategy({
            clientID: `${process.env.FACEBOOK_APP_ID}`,
            clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
            callbackURL: "/api/v1/connect/facebook/callback",
            scope: ['email']
        }, async (accessToken: any, refreshToken: any, profile: GoogleProfile, cb: any) => {
            connect(profile.id, profile.provider, profile.displayName, cb);
        })
    );

    passport.use(
        new Strategy({
            clientID: `${process.env.DISCORD_CLIENT_ID}`,
            clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
            callbackURL: "/api/v1/auth/discord/callback",
            scope: [Scope.IDENTIFY, Scope.EMAIL],
        }, async (accessToken: any, refreshToken: any, profile: Profile, cb: any) => {
            let email = profile.emails![0].value;
            authenticate(profile.displayName!, email, profile.provider, profile.username!, profile.id, cb);
        })
    );

    passport.use('discord-auth', 
        new Strategy({
            clientID: `${process.env.DISCORD_CLIENT_ID}`,
            clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
            callbackURL: "/api/v1/connect/discord/callback",
            scope: [Scope.IDENTIFY, Scope.EMAIL],
        }, async (accessToken: any, refreshToken: any, profile: Profile, cb: any) => {
            connect(profile.id, profile.provider, profile.username!, cb);
        })
    );

    passport.use(
        new githubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/github/callback",
            scope: ['user:email'],
        }, async (accessToken: any, refreshToken: any, profile: GithubProfile, cb: any) => {
            let email = profile.emails![0].value;
            authenticate(profile.username!, email, profile.provider, profile.username!, profile.id, cb);
        })
    )

    passport.use('github-auth', 
        new githubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_ID,
            callbackURL: "/api/v1/auth/github/callback",
            scope: ['user:email'],
            passReqToCallback: true
        }, async (req: any, accessToken: any, refreshToken: any, profile: GithubProfile, cb: any) => {
            let user = await SocialAccount.findOne({ where: {social_id: profile.id} });

            if (user != null) {
                cb("This account already been associated.", false);
            } else {
                await SocialAccount.create({
                    social_id: profile.id,
                    user_id: req.user.id,
                    display_name: profile.displayName,
                    social_provider: "github"
                });
        
                cb(null, profile);
            }
        })
    )


    passport.serializeUser((user: any, cb: any) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id: any, cb: any) => {
        let user = await User.findByPk(id);

        if (user == null) {
            cb("User not found", null);
        } else {
            let data = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            
            cb(null, data);
        }
    })
    
}