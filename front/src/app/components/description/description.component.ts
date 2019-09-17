import {
  Component,
  OnInit,
} from '@angular/core';

import { DisplayPanelsService } from './../../services/display-panel.service';
import { InfoService } from './../../services/info.service';
import { ChaptersService } from 'src/app/services/chapters.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  description;
  object;

  constructor(
    private displayPanelsService: DisplayPanelsService,
    private infoService: InfoService,
    private chaptersService: ChaptersService,
  ) {}

  ngOnInit() {
    this.infoService.actualObjectEvent.subscribe(_ => {
      this.description = this.infoService.actualObject.description ||  '';
      this.object = this.infoService.actualObject;
    });
  }

  validateObject() {
    this.object.description = this.description;
    this.infoService.saveProjects();
    // this.chaptersService.updateChapter();
      
    this.displayPanelsService.closeAll();
    this.displayPanelsService.displayPanel('getReady');
  }
}
