import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { VideoModel } from './interfaces/video.interface';
import { CreateVideoDTO } from './dto/create-video.dto';
import { ChapterService } from 'src/chapter/chapter.service';

@Injectable()
export class VideoService {
  newVideoList = [];

  constructor(
    @InjectModel('Video')
    private readonly videoModel: Model<VideoModel>,
    private chapterService: ChapterService,
  ) { }

  // fetch all videos
  async getAllVideo(): Promise<VideoModel[]> {
    const videos = await this.videoModel.find().exec();
    return videos;
  }

  // Get a single video
  async getVideo(id): Promise<VideoModel> {
    const video = await this.videoModel.findById(id).populate('comments').exec();
    return video;
  }

  // post a single video
  async addVideo(createVideoDTO: CreateVideoDTO): Promise<VideoModel> {
    const newVideo = await new this.videoModel(createVideoDTO);
    return newVideo.save();
  }

  async addVideoToChapter(chapterId, createVideoDTO: CreateVideoDTO): Promise<VideoModel> {
    await this.addVideo(createVideoDTO).then(video => {

      this.newVideoList.push(video._id);
      return this.newVideoList;
    }).then(_ => {
      console.log('ici');
      
      const chapterToUpdate = this.chapterService.getChapter(chapterId);

      return chapterToUpdate;
    }).then(chapterToUpdate => {
      chapterToUpdate.videos = this.newVideoList;

      this.chapterService.updateChapter(chapterToUpdate._id, chapterToUpdate);
    });
    
    return;
  }

  // Edit video details
  async updateVideo(id, createVideoDTO: CreateVideoDTO): Promise<VideoModel> {
    const updatedVideo = await this.videoModel.findByIdAndUpdate(id, createVideoDTO, { new: true });
    return updatedVideo;
  }

  // Delete a video
  async deleteVideo(id): Promise<any> {
    const deletedVideo = await this.videoModel.findByIdAndRemove(id);
    return deletedVideo;
  }
}