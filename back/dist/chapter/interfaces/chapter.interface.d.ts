import { Document } from 'mongoose';
import { VideoModel } from 'src/video/interfaces/video.interface';
export interface ChapterModel extends Document {
    readonly description: string;
    readonly name: string;
    readonly position: number;
    readonly videos: VideoModel[];
}
