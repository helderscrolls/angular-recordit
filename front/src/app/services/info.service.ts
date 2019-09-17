import {
  EventEmitter,
  Output,
} from '@angular/core';
import { Injectable } from '@angular/core';

import { NgForage } from 'ngforage';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  @Output() actualProjectEvent = new EventEmitter();
  @Output() actualObjectEvent = new EventEmitter();
  @Output() refreshEvent = new EventEmitter();

  actualObject;
  projectCollection;
  projectToHandle;
  actualProject;

  constructor(
    private readonly ngf: NgForage,
    private projectsService: ProjectsService,
    ) { }

  initCollection(): void {
    this.projectsService.getProjects().subscribe(data => {
      this.projectCollection = data || [];
      this.refreshEvent.emit();
    });
  }

  displayProjects() {
    this.refreshEvent.emit();
  }

  saveProject(project) {
    this.actualProject = project;

    return project;
  }

  getAllProjects () {
    return this.projectCollection;
  }

  getOneProject(id) {
    return this.projectCollection.find(project => project.id === id);
  }

  saveProjects() {
    this.ngf.setItem('projects', this.projectCollection);
  }

  /**
   *
   * fonction to get data from collection
   */
  handleProject(id) {
    this.projectToHandle = this.getOneProject(id);
    this.actualProjectEvent.emit();

    return this.projectToHandle;
  }

  getUniqId() {
    return (new Date().getTime() + Math.floor((Math.random() * 10000) + 1)).toString(16);
  }

  setActualObject(video) {
    this.actualObject = video;
    this.actualObjectEvent.emit();
  }

  moveInIndex(direction, index, data, collection) {
    const firstOne = index === 0;
    const lastOne = index === collection.length - 1;

    if (direction === 'up' && !firstOne) {
      collection.splice(index, 1);
      collection.splice(index - 1, 0, data);
    }

    if (direction === 'down' && !lastOne) {
      collection.splice(index, 1);
      collection.splice(index + 1, 0, data);
    }
  }
}


