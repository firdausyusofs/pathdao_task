import { Table, Model, Column, DataType } from "sequelize-typescript";

interface EmailVerificationAttribute {
    email: string;
    token: string;
    expires_at: Date;
}

@Table({
    timestamps: false,
    tableName: "email_verifications"
})
export class EmailVerification extends Model implements EmailVerificationAttribute {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare token: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare expires_at: Date;
}