import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';

import { ActualProjectService } from './../../services/actual-project.service';
import { ConfigPanelsService } from '../../services/config-panels.service';
import { DisplayPanelsService } from './../../services/display-panel.service';
import { InfoService } from './../../services/info.service';
import { RemoveService } from './../../services/remove.service';
import { ProjectsService } from '../../services/projects.service';
import { ChaptersService } from 'src/app/services/chapters.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-config-index',
  templateUrl: './config-index.component.html',
  styleUrls: ['./config-index.component.scss']
})
export class ConfigIndexComponent implements OnInit {

  @ViewChild('chapterNameElement') chapterNameElement: ElementRef;

  activeGetReady;
  getReadyStatus;
  indexCollection = [];

  /**
   * Node Dependencies
   */
  slugify: any;
  fs: any;

  /**
   * Models for input
  */
  chapterName: string;

  constructor(
    private actualProjectService: ActualProjectService,
    private configPanelsService: ConfigPanelsService,
    private infoService: InfoService,
    private projectsService: ProjectsService,
    private chaptersService: ChaptersService,
    private videosService: VideosService,
    private removeService: RemoveService,
    public displayPanelsService: DisplayPanelsService,
  ) {


    this.configPanelsService.showConfigIndexPanelEvent.subscribe(showConfigIndexPanel => {
      if (showConfigIndexPanel) {
        setTimeout(() => {
          this.focusChapterName();
        }, 500);
      }
    });

    this.displayPanelsService.closeAllPanelsEvent.subscribe(_ => {
      this.indexCollection = [];
      this.chapterName = '';
    });

    this.removeService.removeObject.subscribe(removeEvent => {
      if ('chapter' === removeEvent.type) {
        this.deleteChapter(removeEvent.id);
      }
    });
  }

  ngOnInit() {
    this.slugify = window['slugify'];
    this.fs = window['fs'];
  }

  focusChapterName() {
    this.chapterNameElement.nativeElement.focus();
  }

  addChapter() {
    const chapter = {
      name: this.chapterName,
      videos: [],
      position: `${this.indexCollection.length + 1}`.padStart(2, '0')
    };

    this.indexCollection.push(chapter);
    this.chaptersService.postChapter(chapter);
    this.chapterName = '';
    this.focusChapterName();
  }

  deleteChapter(id) {
    const index = this.indexCollection.findIndex(chapter => chapter.id === id);
    this.indexCollection.splice(index, 1);
    // rajouter delete route + et supprimer chapitre du back
  }

  saveIndex() {
    const projectIndex = this.projectsService.actualProject.project;
    console.log(projectIndex.name);
    
    const folderName = this.slugify(projectIndex.name, {remove: /[*+~.()'"!:@]/g});
    const projectFolder = localStorage.getItem('projectsDirectory');

    projectIndex.chapters = this.indexCollection;
    
    projectIndex.folder = `${projectFolder}/${folderName}`;
    
    this.infoService.initCollection();
    this.infoService.displayProjects();
    this.indexCollection = [];
    this.chapterName = '';

    this.createDirectories(projectIndex.folder);

    this.displayPanelsService.closeAll();
  }

  createDirectories(projectFolder) {
    const videosFolder = `${projectFolder}/videos`;
    const sourcesFolder = `${projectFolder}/sources`;
    const montagesFolder = `${projectFolder}/montages`;
    const tempFolder = `${projectFolder}/temp`;

    const folders = [projectFolder, videosFolder, sourcesFolder, montagesFolder, tempFolder];

    folders.forEach(folder => {
      if (!this.fs.existsSync(folder)) {
        this.fs.mkdirSync(folder);
      }
    });
  }

  pressEnter(event) {
    if (event.keyCode === 13) {
      this.addChapter();
    }
  }

  isActive() {
    this.saveIndex();
    this.displayPanelsService.displayPanel('getReady');
  }

  moveChapterIndex(direction, index, data, collection) {
    this.infoService.moveInIndex(direction, index, data, collection);
  }
}