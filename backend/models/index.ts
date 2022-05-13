import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
const env = process.env.NODE_ENV || 'development';

dotenv.config();

import { User } from "./user";
import { EmailVerification } from "./emailVerification";
import { SocialAccount } from "./socialAccount";

const sequelize = new Sequelize({
    host: "127.0.0.1",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "mysql",
    models: [User, EmailVerification, SocialAccount]
});

export default sequelize;