import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CommentModel } from './interfaces/comment.interface';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { VideoService } from '../video/video.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') 
    private readonly commentModel: Model<CommentModel>,
    private videoService: VideoService,
    ) { }

  // fetch all comments
  async getAllComment(): Promise<CommentModel[]> {
    const comments = await this.commentModel.find().exec();
    return comments;
  }

  // Get comment by video
  async getCommentsByVideo(videoId): Promise<CommentModel[]> {
    const commentsByVideo = await this.commentModel.find({video: videoId}).exec();
    return commentsByVideo
  }

  // Get a single comment
  async getComment(id): Promise<CommentModel> {
    const comment = await this.commentModel.findById(id).exec();
    return comment;
  }

  // post a single comment
  async addComment(createCommentDTO: CreateCommentDTO): Promise<CommentModel> {
    const newComment = await new this.commentModel(createCommentDTO);
    return newComment.save();
  }

  async addCommentToVideo(videoId, createCommentDTO: CreateCommentDTO): Promise<CommentModel> {
    let newComment 
    await this.addComment(createCommentDTO).then(comment => {
      newComment = comment
      console.log('newComment', newComment);
      
      return newComment;
    }).then(_ => {
      let videoToUpdate
      this.videoService.getVideo(videoId).then(
        video => videoToUpdate = video
      ).then(videoToUpdate => {
        console.log(videoToUpdate);
        let videoUpdated;
        videoToUpdate.comments.push(newComment._id);
        videoUpdated = videoToUpdate;
        this.videoService.updateVideo(videoUpdated._id, videoToUpdate) 
      });
      return videoToUpdate
    })
    return newComment
  }

  // Edit comment details
  async updateComment(id, createCommentDTO: CreateCommentDTO): Promise<CommentModel> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(id, createCommentDTO, { new: true });
    return updatedComment;
  }
  
  // Delete a comment
  async deleteComment(id): Promise<any> {
    const deletedComment = await this.commentModel.findByIdAndRemove(id);
    return deletedComment;
  }
}