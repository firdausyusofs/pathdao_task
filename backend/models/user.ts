import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

import { SocialAccount } from "./socialAccount";

interface UserAttribute {
    id: number;
    name: string;
    email: string;
    password: string;
    email_verified_at: Date;
    social_accounts: SocialAccount[]
}

@Table({
    timestamps: true,
    tableName: "users"
})
export class User extends Model implements UserAttribute {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string; 

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare email_verified_at: Date;

    @HasMany(() => SocialAccount)
    declare social_accounts: SocialAccount[]
}