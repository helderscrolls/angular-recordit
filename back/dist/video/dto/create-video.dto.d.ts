import { CommentModel } from "../../comment/interfaces/comment.interface";
export declare class CreateVideoDTO {
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
