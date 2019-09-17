import { ActualProjectService } from './../../services/actual-project.service';
import {
  Component,
  OnInit,
} from '@angular/core';

import { DisplayPanelsService } from './../../services/display-panel.service';
import { InfoService } from './../../services/info.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  getReadyStatus: boolean;
  goToRecord: boolean;
  lessProjects: boolean;
  projectsCollection = [];

  constructor(
    public actualProjectService: ActualProjectService,
    public displayPanelsService: DisplayPanelsService,
    private infoService: InfoService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit() {

    // this.projectsService.refreshEvent.subscribe(_ => {
    //   // this.projectsCollection = [...this.projectsService.getAllProjects()].reverse();
    // });

    this.projectsCollection = [this.projectsService.getProjects()]

    this.infoService.refreshEvent.subscribe(_ => {
      this.projectsCollection = [...this.infoService.getAllProjects()].reverse();
    });

    // this.projectsService.getProjects().subscribe(projects => {
    //   this.projectsCollection = projects;
    //   console.log('GET projects', this.projectsCollection);
      
    //   return projects
    // })
  }

  openRecord(id, $event) {
    $event.preventDefault();

    this.displayPanelsService.displayPanel('getReady');
    this.infoService.handleProject(id);
    this.actualProjectService.setActiveProjectId(id);
  }

  editDescription(object) {
    this.infoService.setActualObject(object);
    this.goToRecord = true;
    this.displayPanelsService.closeAll();
    this.displayPanelsService.displayPanel('description');
  }
}
