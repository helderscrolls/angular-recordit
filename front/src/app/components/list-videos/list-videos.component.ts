import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss']
})
export class ListVideosComponent implements OnInit {
  // [x: string]: any;
  projectCollection;
  showChapter: boolean = false;
  projectIndex: number;
  chapterIndex: number;
  showVideo: boolean = false;

  constructor(
    private projectsService: ProjectsService,
    private videosService: VideosService
  ) { }

  ngOnInit() {

    this.projectsService.getProjects().subscribe(res => {
      this.projectCollection = res
      console.log('added to videoCollection', this.projectCollection);
      } 
    )
  }

  selectVideo(video) {
    this.videosService.setVideoToComment(video);
    console.log('clickedVideo', video);
    
  }

  showChapterList(index) {
    this.projectIndex = index;
    this.showChapter = !this.showChapter
    console.log(this.showChapter);
  }

  showVideosList(index) {
    this.chapterIndex = index;
    this.showVideo = !this.showVideo;
  }

}
