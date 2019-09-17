import { 
    Controller, 
    Get, 
    Res, 
    HttpStatus, 
    Post, 
    Body, 
    Put, 
    NotFoundException, 
    Delete,
    Param 
  } from '@nestjs/common';
  
  import { CommentService } from './comment.service';
  import { CreateCommentDTO } from './dto/create-comment.dto';
  
  @Controller('comments')
  export class CommentController {
    constructor(
      private commentService: CommentService
    ) { }
  
    // add a comment
    @Post(':videoId/comment')
    async addComment(@Res() res, @Param('videoId') videoId, @Body() createCommentDTO: CreateCommentDTO) {
      const comment = await this.commentService.addCommentToVideo(videoId, createCommentDTO);
      return res.status(HttpStatus.OK).json({
        message: "Comment has been created successfully",
        comment
      })
    }
  
    // Retrieve comments list
    @Get()
    async getAllComment(@Res() res) {
      const comments = await this.commentService.getAllComment();
      return res.status(HttpStatus.OK).json(comments);
    }

    // Get Comment By Video
    @Get(':videoId')
    async getCommentsByVideo(@Res() res, @Param('videoId') id) {
      const comments = await this.commentService.getCommentsByVideo(id);
      if (!comments) throw new NotFoundException('Comment does not exist!');
      return res.status(HttpStatus.OK).json(comments);
    }
  
    // Fetch a particular comment using ID
    @Get(':id')
    async getComment(@Res() res, @Param('id') id) {
      const comment = await this.commentService.getComment(id);
      if (!comment) throw new NotFoundException('Comment does not exist!');
      return res.status(HttpStatus.OK).json(comment);
    }
  
    // Update a comment's details
    @Put(':id')
    async updateComment(@Res() res, @Param('id') id, @Body() createCommentDTO: CreateCommentDTO) {
      const comment = await this.commentService.updateComment(id, createCommentDTO);
      if (!comment) throw new NotFoundException('Comment does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Comment has been successfully updated',
        comment
      });
    }
  
    // Delete a comment
    @Delete(':id')
    async deleteComment(@Res() res, @Param('id') id) {
      const comment = await this.commentService.deleteComment(id);
      if (!comment) throw new NotFoundException('Comment does not exist');
      return res.status(HttpStatus.OK).json({
        message: 'Comment has been deleted',
        comment
      })
    }
  }