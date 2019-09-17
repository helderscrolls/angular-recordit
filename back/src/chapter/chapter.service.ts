import { InjectModel } from '@nestjs/mongoose';
import { 
  Injectable,
} from '@nestjs/common';

import { Model } from 'mongoose';

import { ChapterModel } from './interfaces/chapter.interface';
import { CreateChapterDTO } from './dto/create-chapter.dto';
import { ProjectService } from 'src/project/project.service';
import { VideoService } from 'src/video/video.service';

@Injectable()
export class ChapterService {
  newChapterList = [];
  actualChapter;

  constructor(
    @InjectModel('Chapter')
    private readonly chapterModel: Model<ChapterModel>,
    private projectService: ProjectService,
  ) { }

  // fetch all chapters
  async getAllChapter(): Promise<ChapterModel[]> {
    const chapters = await this.chapterModel.find().exec();
    return chapters;
  }

  // Get a single chapter
  async getChapter(id): Promise<ChapterModel> {
    const chapter = await this.chapterModel.findById(id).exec();
    return chapter;
  }

  // post a single chapter
  async addChapter(createChapterDTO: CreateChapterDTO): Promise<ChapterModel> {
    const newChapter = await new this.chapterModel(createChapterDTO);
    //this.videoService.newVideoList = [];
    this.actualChapter = newChapter._id;

    return newChapter.save();
  }

  async addChapterToProject(projectId, createChapterDTO: CreateChapterDTO): Promise<ChapterModel> {
    let newChapter;

    await this.addChapter(createChapterDTO).then(chapter => {
      // this.newChapterList.push(chapter._id);
      newChapter = chapter._id;
      return newChapter;
    }).then(_ => {
      const projectToUpdate = this.projectService.getProject(projectId);

      return projectToUpdate;
    }).then(projectToUpdate => {
      projectToUpdate.chapters = newChapter;
 console.log('chapters that will be added',projectToUpdate.chapters);
 
      this.projectService.updateProject(projectToUpdate._id, projectToUpdate);
      
    });
    return newChapter;
  }

  // Edit chapter details
  async updateChapter(id, createChapterDTO: CreateChapterDTO): Promise<ChapterModel> {
    const updatedChapter = await this.chapterModel
      .findByIdAndUpdate(id, createChapterDTO, { new: true });
    return updatedChapter;
  }

  // Delete a chapter
  async deleteChapter(id): Promise<any> {
    const deletedChapter = await this.chapterModel.findByIdAndRemove(id);
    return deletedChapter;
  }
}