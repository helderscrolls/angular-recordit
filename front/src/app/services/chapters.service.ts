import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProjectsService } from '../services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  basePath = 'http://localhost:3000';
  chapterCollection;
  actualChapter;

  constructor(
    private httpClient: HttpClient,
    private projectsService: ProjectsService
  ) { }

  getChapters() {
    return this.httpClient.get(`${this.basePath}/chapters`).subscribe(chapters => {
      this.chapterCollection = chapters;
    })
  }

  getChapterById(chapterId) {
    return this.httpClient.get(`${this.basePath}/chapters/${chapterId}`).subscribe(chapterId => {
      this.actualChapter = chapterId;
    })
  }

  postChapter(chapter) {
    const projectId = this.projectsService.actualProject.project._id;

    return this.httpClient.post(`${this.basePath}/chapters/${projectId}/chapter`, chapter).subscribe((chapter: any) => {
      this.actualChapter = chapter;
      console.log('chapter created', this.actualChapter);

      this.projectsService.actualProject.project.chapters.push(chapter._id);

      this.projectsService.updateProject(this.projectsService.actualProject.project)
        .toPromise()
        .then(project => {
          console.log('project mis a jour', project);

          return project;
        }).catch(error => {
          console.log('erreur mise a jour project', error);

        });
    })
  }

  updateChapter(chapter) {
    const chapterId = this.actualChapter._id;

    console.log('put', chapter);

    return this.httpClient.put(`${this.basePath}/chapters/${chapterId}`, chapter);
  }
}
