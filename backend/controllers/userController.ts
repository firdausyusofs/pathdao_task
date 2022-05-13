import { SocialAccount } from './../models/socialAccount';
import {Request, Response} from "express";
import { User } from "../models/user";

declare module "express" {
    export interface Request {
        user: any
        account: any
    }
}

class UserController {

    // Handling user update
    static async updateName(req: Request, res: Response): Promise<Response> {
        // Destructuring request body
        const { name } = req.body;

        // Update current logged in user
        const result = await User.update(
            { name },
            { where: { id: req.user.id }}
        );

        if (result) {
            return res.json({ 
                status: true,
                message: "Successfully updated."
            });
        }

        return res.json({
            status: false,
            message: "Something went wrong"
        });

    }

    // Get current logged in user profile info
    static async getProfile(req: Request, res: Response) {
        const user = await User.findByPk(req.user.id, {include: [SocialAccount]});
        
        if (user == null) {
            return res.json({
                status: false,
                message: "User not found"
            });
        }

        let data = {
            id: user.id,
            name: user.name,
            email: user.email,
            social_accounts: user.social_accounts
        };

        return res.json({
            status: true,
            message: "Successfully retrieved",
            data: data
        });
    }

}

module.exports = UserController;