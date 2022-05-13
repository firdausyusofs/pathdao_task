import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";

var SequelizeStore = require("connect-session-sequelize")(session.Store);

import sequelize from "./models/index";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: `${process.env.COOKIE_SECRET}`,
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
}));

app.use(cookieParser(`${process.env.COOKIE_SECRET}`));

app.use(passport.initialize());
app.use(passport.session());
require("./utils/passportConfig")(passport);

app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);

const start = async (): Promise<void> => {
    await sequelize.sync();
    try {
        app.listen(PORT, () => {
            console.log("Server started on port " + PORT);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

void start();