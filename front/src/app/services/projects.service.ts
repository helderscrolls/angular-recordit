import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  basePath = 'http://localhost:3000';
  projectCollection;
  actualProject;
  
  @Output() refreshEvent = new EventEmitter();

  constructor(
    private httpClient: HttpClient
  ) {}

  getProjects() {
    return this.httpClient.get(`${this.basePath}/projects`)
  }

  getProjectById(projectId) {
    return this.httpClient.get(`${this.basePath}/projects/${projectId}`).subscribe(projectId => {
      this.actualProject = projectId;
    })
  }

  postProject(project) {
    const token = localStorage.getItem('token');

    const tokenPayload: any = token ? JWT(token) : null;

    const userId = tokenPayload._id;
    return this.httpClient.post(`${this.basePath}/projects/${userId}/project/`, project).toPromise()
    .then(project => {
      console.log('good', project);
      this.actualProject = project;
      
      return project;
      
    }).catch(error => {
      console.log('erreur', error);
      
    });
  }

  updateProject(project) {
    const projectId = this.actualProject.project._id;

    return this.httpClient.put(`${this.basePath}/projects/${projectId}`, project)
  }
}


