import { Model } from 'mongoose';
import { VideoModel } from './interfaces/video.interface';
import { CreateVideoDTO } from './dto/create-video.dto';
import { ChapterService } from 'src/chapter/chapter.service';
export declare class VideoService {
    private readonly videoModel;
    private chapterService;
    constructor(videoModel: Model<VideoModel>, chapterService: ChapterService);
    getAllVideo(): Promise<VideoModel[]>;
    getVideo(id: any): Promise<VideoModel>;
    addVideo(createVideoDTO: CreateVideoDTO): Promise<VideoModel>;
    addVideoToChapter(chapterId: any, createVideoDTO: CreateVideoDTO): Promise<VideoModel>;
    updateVideo(id: any, createVideoDTO: CreateVideoDTO): Promise<VideoModel>;
    deleteVideo(id: any): Promise<any>;
}
