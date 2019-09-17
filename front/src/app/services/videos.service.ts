import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChaptersService } from './chapters.service';

@Injectable({
  providedIn: 'root'
})

export class VideosService {
  basePath = 'http://localhost:3000';
  videoCollection;
  actualVideo;
  videosToPush = [];
  videoToComment;
  
  @Output() videoToCommentEvent: EventEmitter<any> = new EventEmitter;

  constructor(
    private httpClient: HttpClient,
    private chaptersService: ChaptersService
  ) { }

  setVideoToComment(video) {
    console.log('setVideoToComment', video);
    this.videoToComment = video;
    this.videoToCommentEvent.emit(this.videoToComment);
  }

  getVideos() {
    return this.httpClient.get(`${this.basePath}/videos`);
  }

  getVideoById(videoId) {
    return this.httpClient.get(`${this.basePath}/videos/${videoId}`).toPromise();
  }

  postVideo(video) {
    const chapterId = this.chaptersService.actualChapter._id;

    return this.httpClient.post(`${this.basePath}/videos/${chapterId}/video`, video).subscribe((video: any) => {

      this.chaptersService.actualChapter.videos.push(video._id);

      this.chaptersService.updateChapter(this.chaptersService.actualChapter)
        .toPromise()
        .then(video => {
          console.log('chapter mis a jour', video);

          return video;
        }).catch(error => {
          console.log('erreur mise a jour chapter', error);

        });
    })
  }

}
