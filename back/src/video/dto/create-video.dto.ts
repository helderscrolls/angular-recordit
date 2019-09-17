import { CommentModel } from "../../comment/interfaces/comment.interface";

export class CreateVideoDTO {
  comments: CommentModel[];
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