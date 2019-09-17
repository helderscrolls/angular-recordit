import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ChapterModule } from './chapter/chapter.module';
import { VideoModule } from './video/video.module';
import { AuthBackModule } from '@blueframework/auth-back';
import { CommentModule } from './comment/comment.module';
import { UploadBackModule } from '@blueframework/upload-back';

@Module({
  imports: [
    AuthBackModule,
    ChapterModule,
    CommentModule,
    MongooseModule.forRoot('mongodb://localhost/record-it-app', { useNewUrlParser: true }),
    ProjectModule,
    // UserModule,
    UploadBackModule.register({
      folder: './uploads'
    }),
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
