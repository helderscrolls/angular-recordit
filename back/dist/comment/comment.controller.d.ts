import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    addComment(res: any, videoId: any, createCommentDTO: CreateCommentDTO): Promise<any>;
    getAllComment(res: any): Promise<any>;
    getComment(res: any, id: any): Promise<any>;
    updateComment(res: any, id: any, createCommentDTO: CreateCommentDTO): Promise<any>;
    deleteComment(res: any, id: any): Promise<any>;
}
