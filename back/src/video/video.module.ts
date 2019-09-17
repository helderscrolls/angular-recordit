import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { VideoSchema } from './schemas/video.schema';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { ChapterModule } from 'src/chapter/chapter.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    forwardRef(() => ChapterModule),
    forwardRef(() => ProjectModule),
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
  providers: [
    VideoService
  ],
  controllers: [
    VideoController
  ],
  exports: [
    VideoService
  ],
})
export class VideoModule {}
