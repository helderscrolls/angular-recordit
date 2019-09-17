import { VideoService } from './video.service';
import { CreateVideoDTO } from './dto/create-video.dto';
export declare class VideoController {
    private videoService;
    constructor(videoService: VideoService);
    addVideo(res: any, chapterId: any, createVideoDTO: CreateVideoDTO): Promise<any>;
    getAllVideo(res: any): Promise<any>;
    getVideo(res: any, id: any): Promise<any>;
    updateVideo(res: any, id: any, createVideoDTO: CreateVideoDTO): Promise<any>;
    deleteVideo(res: any, id: any): Promise<any>;
}
