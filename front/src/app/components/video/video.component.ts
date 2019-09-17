import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { RemoveService } from './../../services/remove.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  @Input() video;

  @Output() moveVideoEvent = new EventEmitter();

  constructor(
    private removeService: RemoveService,
  ) {}

  openPopover() {
    this.removeService.display({ type: 'video', id: this.video.id });
  }

  moveIndex(direction: string) {
    this.moveVideoEvent.emit(direction);
  }
}
