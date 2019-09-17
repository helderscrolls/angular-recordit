import { Model } from 'mongoose';
import { CommentModel } from './interfaces/comment.interface';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { VideoService } from '../video/video.service';
export declare class CommentService {
    private readonly commentModel;
    private videoService;
    constructor(commentModel: Model<CommentModel>, videoService: VideoService);
    getAllComment(): Promise<CommentModel[]>;
    getComment(id: any): Promise<CommentModel>;
    addComment(createCommentDTO: CreateCommentDTO): Promise<CommentModel>;
    addCommentToVideo(videoId: any, createCommentDTO: CreateCommentDTO): Promise<CommentModel>;
    updateComment(id: any, createCommentDTO: CreateCommentDTO): Promise<CommentModel>;
    deleteComment(id: any): Promise<any>;
}
