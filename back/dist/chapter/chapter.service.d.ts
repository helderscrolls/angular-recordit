import { Model } from 'mongoose';
import { ChapterModel } from './interfaces/chapter.interface';
import { CreateChapterDTO } from './dto/create-chapter.dto';
import { ProjectService } from 'src/project/project.service';
export declare class ChapterService {
    private readonly chapterModel;
    private projectService;
    constructor(chapterModel: Model<ChapterModel>, projectService: ProjectService);
    getAllChapter(): Promise<ChapterModel[]>;
    getChapter(id: any): Promise<ChapterModel>;
    addChapter(createChapterDTO: CreateChapterDTO): Promise<ChapterModel>;
    addChapterToProject(projectId: any, createChapterDTO: CreateChapterDTO): Promise<ChapterModel>;
    updateChapter(id: any, createChapterDTO: CreateChapterDTO): Promise<ChapterModel>;
    deleteChapter(id: any): Promise<any>;
}
