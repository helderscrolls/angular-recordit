import { ActualProjectService } from './services/actual-project.service';
import {
  Component,
  OnInit,
} from '@angular/core';

import { InfoService } from './services/info.service';
import { DisplayPanelsService } from './services/display-panel.service';

declare var nw: any;

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  goToRecord: boolean;
  projectsCollection = [];

  constructor(
    private actualProjectService: ActualProjectService,
    private infoService: InfoService,
    public displayPanelsService: DisplayPanelsService,
    ) {
    this.infoService.initCollection();
  }

  ngOnInit() {
    this.infoService.refreshEvent.subscribe(_ => {
      this.projectsCollection = [...this.infoService.getAllProjects()].reverse().splice(0, 5);
    });

    this.displayPanelsService.closeAllPanelsEvent.subscribe(_ => {
      this.displayPanelsService.activePanel = true;
    });
  }

  showProjectConfig() {
    this.displayPanelsService.displayPanel('configProject');
  }

  handleClosePanel() {
    if (this.thereIsAnActivePanel()) {
      this.displayPanelsService.closeAll();
    } else {
      this.displayPanelsService.displayPanel('parameter');
    }
  }

  thereIsAnActivePanel() {
    return Object.keys(this.displayPanelsService.panels).some(key => this.displayPanelsService.panels[key]);
  }

  getProjects() {
    this.displayPanelsService.displayPanel('projectsList');
  }

  openRecord(id, $event) {
    $event.preventDefault();

    this.displayPanelsService.displayPanel('getReady');
    this.infoService.handleProject(id);
    this.actualProjectService.setActiveProjectId(id);
  }

  editDescription(object) {
    this.selectObject(object);
    this.displayPanelsService.closeAll();
    this.displayPanelsService.displayPanel('description');
  }

  selectObject(object) {
    this.infoService.setActualObject(object);

    this.goToRecord = true;
  }
}
