import { ChapterService } from './chapter.service';
import { CreateChapterDTO } from './dto/create-chapter.dto';
export declare class ChapterController {
    private chapterService;
    constructor(chapterService: ChapterService);
    addChapter(res: any, projectId: any, createChapterDTO: CreateChapterDTO): Promise<any>;
    getAllChapter(res: any): Promise<any>;
    getChapter(res: any, id: any): Promise<any>;
    updateChapter(res: any, id: any, createChapterDTO: CreateChapterDTO): Promise<any>;
    deleteChapter(res: any, id: any): Promise<any>;
}
