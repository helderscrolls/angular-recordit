import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { InfoService } from './../../services/info.service';
import { RemoveService } from './../../services/remove.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent {
  newVideoList = [];

  @Input() chapter;

  @Output() moveChapterEvent = new EventEmitter();

  @ViewChild('videoNameElement') videoNameElement: ElementRef;

  constructor(
    private infoService: InfoService,
    private removeService: RemoveService,
    private videosService: VideosService,
  ) {
    this.removeService.removeObject.subscribe(removeEvent => {
      if ('video' === removeEvent.type) {
        this.deleteVideo(removeEvent.id);
      }
    });
  }

  displaySubClew: boolean;
  videoName: string;

  addVideo() {
    const video = {
      name: this.videoName,
      finished: false,
      position: `${this.chapter.videos.length + 1}`.padStart(2, '0'),
      chapterPosition: this.chapter.position,
    };

    this.chapter.videos.push(video);
    this.videosService.postVideo(video);
    
    this.videoName = '';
    this.focusVideoName();
  }

  openPopover() {
    this.removeService.display({ type: 'chapter', id: this.chapter.id });
  }

  deleteVideo(id) {
    const index = this.chapter.videos.findIndex(video => video.id === id);

    if (index === -1) {
      return;
    }

    this.chapter.videos.splice(index, 1);
  }

  pressEnter(event) {
    if (event.keyCode === 13) {
      this.addVideo();
    }
  }

  focusVideoName() {
    this.videoNameElement.nativeElement.focus();
  }

  moveVideoIndex(direction, index, data, collection) {
    this.infoService.moveInIndex(direction, index, data, collection);
  }

  moveChapterIndex(direction: string) {
    this.moveChapterEvent.emit(direction);
  }
}
