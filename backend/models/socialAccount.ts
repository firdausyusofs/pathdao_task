import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user";

interface SocialAccountAttribute {
    id: number;
    user_id: number;
    social_id: string;
    display_name: string;
    social_provider: string;
}

@Table({
    timestamps: true,
    tableName: "social_accounts"
})
export class SocialAccount extends Model implements SocialAccountAttribute {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare social_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare display_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare social_provider: string;
}