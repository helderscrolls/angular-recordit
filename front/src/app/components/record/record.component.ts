import {
  Component, OnInit,
} from '@angular/core';

import { ActualProjectService } from './../../services/actual-project.service';
import { DisplayPanelsService } from './../../services/display-panel.service';
import { InfoService } from './../../services/info.service';

import * as moment from 'moment';
import { timer } from 'rxjs';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  backgroundAnimation;
  savedSeconds = { seconds: 0 };
  seconds;
  timer;
  timerDisplay;

  /**
   * node dependencies
   */
  duration: any;
  fs: any;
  robot: any;
  selectedVideo: any;
  slugify: any;
  zipFolder: any;

  constructor(
    private actualProjectService: ActualProjectService,
    private displayPanelsService: DisplayPanelsService,
    private infoService: InfoService,
  ) {
    this.displayPanelsService.displayPanelEvent.subscribe(panelName => {
      if ('record' === panelName) {
        this.backgroundAnimation = true;
        this.seconds = 0;
        this.timerDisplay = '00:00:00';

        setTimeout(_ => {
          this.startTimer();
        }, 2000);
      }
    });

    this.displayPanelsService.closeAllPanelsEvent.subscribe(_ => {
      this.backgroundAnimation = false;

      if (this.timer) {
        this.timer.unsubscribe();
      }
    });

    this.infoService.actualObjectEvent.subscribe(_ => {
      this.selectedVideo = this.infoService.actualObject;
    });
  }

  ngOnInit() {
    this.robot = window['robotjs'];
    this.fs = window['fs'];
    this.slugify = window['slugify'];
    this.zipFolder = window['zipFolder'];
    this.duration = window['duration'];
  }

  startTimer() {
    this.timer = timer(1, 1000).subscribe(seconds => {
      this.seconds = this.savedSeconds.seconds + seconds;

      this.timerDisplay = moment().startOf('day')
        .seconds(this.seconds)
        .format('HH:mm:ss')
      ;
    });
  }

  stopTimer() {
    this.timer.unsubscribe();

    if (localStorage.getItem('shortcutKeysForSoftwareStop')) {
      const shortcut = JSON.parse(localStorage.getItem('shortcutKeysForSoftwareStop'));
      const keyToTap = shortcut.find(key => key.length === 1)[0];
      const modifiers = shortcut.filter(key => key.length !== 1);

      this.robot.keyTap(keyToTap, modifiers);
    }

    this.moveVideoFile();
    this.moveExerciceFiles();

    this.selectedVideo.finished = true;
    this.infoService.saveProjects();

    this.displayPanelsService.closeAll();
    this.displayPanelsService.displayPanel('description');
  }

  moveVideoFile() {
    const actualProjectId = this.actualProjectService.getActiveProjectId();
    const project = this.infoService.getOneProject(actualProjectId);
    const file = this.getLastFile();

    const position = `${this.selectedVideo.chapterPosition}_${this.selectedVideo.position}`;
    const videoName = `${position}_${this.slugify(this.selectedVideo.name, {remove: /[*+~.()'"!:@]/g})}`;
    const movePath = `${project.folder}/videos/${videoName}.mov`;

    this.selectedVideo.videoFile = movePath;

    setTimeout(_ => {
      this.fs.renameSync(file, movePath);
      this.duration.getVideoDurationInSeconds(movePath).then(duration => {
        this.selectedVideo.duration = Math.round(duration);
      });
    }, 3000);
  }

  moveExerciceFiles() {
    const actualProjectId = this.actualProjectService.getActiveProjectId();
    const project = this.infoService.getOneProject(actualProjectId);

    const position = `${this.selectedVideo.chapterPosition}_${this.selectedVideo.position}`;
    const zipName = `${position}_${this.slugify(this.selectedVideo.name, {remove: /[*+~.()'"!:@]/g})}`;
    const movePath = `${project.folder}/sources/${zipName}`;
    const zipPath = `${movePath}.zip`;
    const tempPath = `${project.folder}/temp`;
    const sourcesPath = project.exerciceDirectory;

    this.selectedVideo.exerciceFile = movePath;

    if (project.options === 'project') {
      this.zipForProject(tempPath, sourcesPath, zipPath);
    } else {
      this.moveForIndependantFiles(sourcesPath, movePath);
    }
  }

  zipForProject(tempPath, sourcesPath, movePath) {
    this.fs.copy(sourcesPath, tempPath, _ => {
      this.fs.removeSync(`${tempPath}/node_modules`);
      this.fs.removeSync(`${tempPath}/package-lock.json`);

      this.zipFolder.zipFolder(tempPath, movePath);

      setTimeout(() => {
        this.fs.readdir(tempPath, (err, files) => {
          for (const file of files) {
            this.fs.removeSync(`${tempPath}/${file}`);
          }
        });
      }, 3000);
    });
  }

  moveForIndependantFiles(sourcesPath, movePath) {
    if (!this.fs.existsSync(movePath)) {
      this.fs.mkdirSync(movePath);
    }

    this.fs.copy(sourcesPath, movePath);
  }

  getLastFile() {
    const dir = localStorage.getItem('videosDirectory');

    const files = this.fs.readdirSync(dir);

    files.sort((a, b) => {
      return this.fs.statSync(`${dir}/${b}`).mtime.getTime() - this.fs.statSync(`${dir}/${a}`).mtime.getTime();
    });

    return `${dir}/${files[0]}`;
  }

  restartRecord() {
    const shortcutKeysForSoftwareRestart = localStorage.getItem('shortcutKeysForSoftwareRestart');

    if (shortcutKeysForSoftwareRestart) {
      const shortcut = JSON.parse(shortcutKeysForSoftwareRestart);
      const keyToTap = shortcut.find(key => key.length === 1)[0];
      const modifiers = shortcut.filter(key => key.length !== 1);

      this.robot.keyTap(keyToTap, modifiers);

      this.backgroundAnimation = false;
      this.timer.unsubscribe();
      this.displayPanelsService.displayPanel('record');
    }
  }
}
