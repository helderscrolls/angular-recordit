import { Document } from 'mongoose';
import { VideoModel } from 'src/video/interfaces/video.interface';
import { ChapterSchema } from 'dist/chapter/schemas/chapter.schema';

export interface ChapterModel extends Document {
  readonly description: string;
  readonly name: string;
  readonly position: number;
  videos: VideoModel[];
}