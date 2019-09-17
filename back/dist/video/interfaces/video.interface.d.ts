import { Document } from 'mongoose';
import { CommentModel } from 'src/comment/interfaces/comment.interface';
export interface VideoModel extends Document {
    readonly comments: CommentModel[];
    readonly createdAt: Date;
    readonly description: string;
    readonly exerciceFile: string;
    readonly finished: boolean;
    readonly name: string;
    readonly position: number;
    readonly chapterPosition: number;
    readonly videoDuration: number;
    readonly videoFile: string;
}
