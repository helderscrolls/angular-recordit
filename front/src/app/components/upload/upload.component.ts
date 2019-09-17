import { Component, OnInit } from '@angular/core';
import { UploadFrontModule } from '@blueframework/upload-front';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  test(event) {
    console.log(event);
    
  }

}
