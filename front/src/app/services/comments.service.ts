import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { VideosService } from '../services/videos.service'
import { Observable, from } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class CommentsService { 
  basePath = "http://localhost:3000/comments"
  commentCollection;

  constructor(
    private httpClient :HttpClient, 
    private videosService : VideosService
  ) {}

  getAllComment(){
    return this.httpClient.get(`${this.basePath}`)
    }

  getCommentsByVideo(){
    return this.httpClient.get(`${this.basePath}`)
  }

  postComment(comment) {
    console.log(this.videosService.videoToComment, this.videosService.videoToComment._id, this.videosService.videoToComment.id);
    
    const videoId = this.videosService.videoToComment._id;
    console.log('videoId', videoId, 'else', this.videosService.videoToComment._id);
    

    return this.httpClient.post(`${this.basePath}/${videoId}/comment`, comment).toPromise()
    .then(comment => {
      console.log('good', comment);

    }).catch(error => {
      console.log('erreur', error);
    });
  }

  getComment():Observable<any> {
    return this.httpClient.get(`${this.basePath}/getComment`)

  }

}
