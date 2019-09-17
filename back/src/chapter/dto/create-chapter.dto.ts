import { VideoModel } from "src/video/interfaces/video.interface";

export class CreateChapterDTO {
  readonly description: string;
  readonly name: string;
  readonly position: number;
  videos: VideoModel[];
}