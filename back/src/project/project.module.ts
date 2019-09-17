import { VideoModule } from 'src/video/video.module';
import { ChapterModule } from './../chapter/chapter.module';
import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ProjectSchema } from './schemas/project.schema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [
    forwardRef(() => ChapterModule),
    forwardRef(() => VideoModule),
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])
  ],
  providers: [
    ProjectService
  ],
  controllers: [
    ProjectController
  ],
  exports: [
    ProjectService
  ],
})
export class ProjectModule { }
