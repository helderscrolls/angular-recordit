import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualProjectService {
  activeProjectId;

  setActiveProjectId(id) {
    this.activeProjectId = id;
  }

  getActiveProjectId() {
    return this.activeProjectId;
  }
}
