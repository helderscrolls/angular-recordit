import { VideoModel } from "src/video/interfaces/video.interface";
export declare class CreateChapterDTO {
    readonly description: string;
    readonly name: string;
    readonly position: number;
    readonly videos: VideoModel[];
}
