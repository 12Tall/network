import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import crypto from 'crypto'

@Entity("user")
export default class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number = 0;
    @Index()
    @Column({ length: 255 })
    lower_name: string = "";
    @Index()
    @Column({ length: 255 })
    name: string = "";
    @Column({ length: 255 })
    full_name: string = "";
    @Column({ length: 255 })
    email: string = "";
    @Column({ length: 255 })
    passwd: string = "";
    // @Column({ length: 10 })
    // rands: string = "";
    @Column({ length: 10 })
    salt: string = "";
    @Column({ type: "tinyint" })
    is_active: number = 0;

    // ref: https://github.com/gogs/gogs/blob/master/internal/db/user.go#L323
    EncodePassword() {
        this.passwd = crypto.pbkdf2Sync(this.passwd, this.salt, 10000, 50, "sha256").toString("hex");
    }

    ValidatePassword(passwd: string) {
        return this.passwd === crypto.pbkdf2Sync(passwd, this.salt, 10000, 50, "sha256").toString("hex");
    }

}