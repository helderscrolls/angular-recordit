import { Document } from 'mongoose';
export interface UserModel extends Document {
    readonly email: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly password: string;
    readonly roles: string;
}
