import { User } from "../interface/user";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {

    //user register
    static async register(user: User) {
        const { firstName, lastName, email, password, phone, address } = user;
        const id = crypto.randomUUID();
        const newUser = {
            id,
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
        };

        return this.queryBuilder().insert(newUser).table("users");
    }
    
    // get user by email
    static getUserByEmail(email: string) {
        return this.queryBuilder().select("id", "firstName", "lastName", "email", "password").table("users").where({ email }).first();
    }
}
