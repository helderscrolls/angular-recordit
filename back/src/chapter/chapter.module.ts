import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ChapterSchema } from './schemas/chapter.schema';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { ProjectModule } from 'src/project/project.module';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [
    forwardRef(() => VideoModule),
    forwardRef(() => ProjectModule),
    MongooseModule.forFeature([{ name: 'Chapter', schema: ChapterSchema }]),
  ],
  providers: [
    ChapterService,
  ],
  controllers: [
    ChapterController
  ],
  exports: [
    ChapterService
  ],
})
export class ChapterModule { }
