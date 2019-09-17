import { Component, OnInit, ViewChild } from '@angular/core';
import {
 FormGroup,
 FormBuilder,
 Validators
} from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { VideosService } from 'src/app/services/videos.service'

import { DatePipe } from '@angular/common';

import { ScrollToBottomDirective } from '../../directives/scroll-to-bottom.directive'

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
  providers: [DatePipe]
})
export class CommentsSectionComponent implements OnInit {

  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;

  formAddComments: FormGroup;
  submitted = false;
  commentsByVideo;
  video: any;
  today = Date.now();
  idVideoForComment;

  constructor(
    private fb: FormBuilder, 
    private commentService: CommentsService,
    private videosService: VideosService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.initVideo();
  }

  initVideo() {
    this.videosService.videoToCommentEvent.subscribe(video => {
      this.video = video;
      this.getVideo(video);
    });
  }

  getVideo(video) {
    this.videosService.getVideoById(video._id).then((video: any) => {
      this.commentsByVideo = video.comments;
      console.log('GET Video', this.commentsByVideo);
    })
  }
  
  initForm() {
    this.formAddComments = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  onSubmit(){
    const comment = this.formAddComments.value;
    this.commentService.postComment(comment).then(
      res => {
        console.log(res);
        this.initForm();
        this.getVideo(this.video)
      });
    }
    
  pressEnter(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
  }
}

}