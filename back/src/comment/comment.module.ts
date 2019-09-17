import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { CommentSchema } from './schemas/comment.schema';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { VideoModule } from 'src/video/video.module';
import { VideoService } from 'src/video/video.service';
import { ProjectService } from 'dist/project/project.service';
import { ChapterService } from 'src/chapter/chapter.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    VideoModule
  ],
  providers: [
    ProjectService,
    ChapterService,
    VideoService,
    CommentService
  ],
  controllers: [CommentController]
})
export class CommentModule { }