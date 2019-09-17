import { Document } from 'mongoose';
export interface CommentModel extends Document {
    readonly message: string;
    readonly user: string;
    readonly createdAt: Date;
}
