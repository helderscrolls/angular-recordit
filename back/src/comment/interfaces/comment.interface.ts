import { Document } from 'mongoose';

export interface CommentModel extends Document {
  readonly comment: string;
  readonly user: string;
  readonly createdAt: Date;
  readonly description: string;
  readonly video: string [];
}