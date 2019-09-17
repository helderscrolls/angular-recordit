import { RemoveService } from './../../services/remove.service';
import {
  Component,
  OnInit,
} from '@angular/core';

import hotkeys from 'hotkeys-js';

import { DisplayPanelsService } from './../../services/display-panel.service';
import { InfoService } from './../../services/info.service';

@Component({
  selector: 'app-get-ready',
  templateUrl: './get-ready.component.html',
  styleUrls: ['./get-ready.component.scss']
})
export class GetReadyComponent implements OnInit {
  chapterSelected;
  getVideo: boolean;
  goToRecord: boolean;
  project;
  selectedVideo;
  videosMap = [];
  shortcutKeys;

  /**
   * node dependencies
   */
  cp: any;
  fs: any;
  os: any;
  robot: any;

  constructor(
    public displayPanelsService: DisplayPanelsService,
    private infoService: InfoService,
    private removeService: RemoveService,
  ) {
    this.removeService.removeObject.subscribe(removeEvent => {
      if ('record' === removeEvent.type) {
        this.removeAssets(removeEvent.id);
      }
    });
  }

  /**
   * call projects from project list to get data
   */
  ngOnInit() {
    this.robot = window['robotjs'];
    this.fs = window['fs'];
    this.cp = window['cp'];
    this.os = window['os'];

    this.infoService.actualProjectEvent.subscribe(_ => {
      this.videosMap = [];
      this.project = this.infoService.projectToHandle;

      this.project.index.forEach(chapter => {
        chapter.videos.forEach(video => {
          this.videosMap.push(video);
        });
      });
    });

    this.infoService.actualObjectEvent.subscribe(_ => {
      this.selectedVideo = this.infoService.actualObject;
    });

    this.displayPanelsService.closeAllPanelsEvent.subscribe(_ => {
      this.goToRecord = false;

      hotkeys.unbind('up, down');
      hotkeys.unbind(this.shortcutKeys);
    });

    this.displayPanelsService.displayPanelEvent.subscribe(panelName => {
      if (panelName === 'getReady') {
        hotkeys('up, down', (event, handler) => {
          event.preventDefault();

          if ('up' === handler.shortcut) {
            if (this.selectedVideo) {
              const selectedVideoIndex = this.videosMap.findIndex(video => this.selectedVideo.id === video.id);

              if (selectedVideoIndex !== 0) {
                const selectedVideo = this.videosMap[selectedVideoIndex - 1];
                this.selectObject(selectedVideo, null);
              }
            }
          } else {
            if (!this.selectedVideo) {
              const selectedVideo = this.videosMap[0];

              return this.selectObject(selectedVideo, null);
            }

            const selectedVideoIndex = this.videosMap.findIndex(video => this.selectedVideo.id === video.id);

            if (selectedVideoIndex !== this.videosMap.length - 1) {
              const selectedVideo = this.videosMap[selectedVideoIndex + 1];
              this.selectObject(selectedVideo, null);
            }
          }
        });

        if (localStorage.getItem('shortcutKeysForStartAndStop')) {
          this.shortcutKeys = JSON.parse(localStorage.getItem('shortcutKeysForStartAndStop')).join('+');

          hotkeys(this.shortcutKeys, (event, handler) => {
            event.preventDefault();

            if (this.selectedVideo) {
              this.startRecord();
            }
          });
        }
      }
    });
  }

  selectObject(object, $event) {
    if ($event) {
      $event.preventDefault();
    }

    this.infoService.setActualObject(object);

    this.goToRecord = true;
  }

  startRecord() {
    this.displayPanelsService.displayPanel('record');
    this.goToRecord = false;

    if (localStorage.getItem('shortcutKeysForSoftwareStart')) {
      const shortcut = JSON.parse(localStorage.getItem('shortcutKeysForSoftwareStart'));
      const keyToTap = shortcut.find(key => key.length === 1)[0];
      const modifiers = shortcut.filter(key => key.length !== 1);

      this.robot.keyTap(keyToTap, modifiers);
    }
  }

  playRecordedVideo(video) {
    this.cp.exec(`${this.getOpenCommand()} ${video.videoFile}`)
  }

  getOpenCommand() {
    switch (this.os.platform()) {
       case 'darwin' : return 'open';
       case 'win32' : return 'start';
       default : return 'xdg-open';
    }
  }

  removeAssets(id) {
    let video;

    this.project.index.forEach(chapter => {
      chapter.videos.forEach(videoOfChapter => {
        if (id === videoOfChapter.id) {
          video = videoOfChapter;
        }
      });
    });

    if (!video) {
      return;
    }

    if (video.videoFile) {
      this.fs.removeSync(video.videoFile);
    }

    if (video.exerciceFile) {
      this.fs.removeSync(video.exerciceFile);
    }

    video.finished = false;
    video.videoFile = null;
    video.exerciceFile = null;
    video.description = null;

    this.infoService.saveProjects();
  }

  editDescription(object) {
    this.selectObject(object, null);
    this.displayPanelsService.closeAll();
    this.displayPanelsService.displayPanel('description');
  }

  openPopover(id) {
    this.removeService.display({ type: 'record', id: id });
  }
}
