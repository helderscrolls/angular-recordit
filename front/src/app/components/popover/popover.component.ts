import { Component } from '@angular/core';

import { RemoveService } from './../../services/remove.service';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
  })
  export class PopoverComponent {
    show;

    constructor(
      private removeService: RemoveService,
    ) {
      this.removeService
        .displayRemove
        .subscribe(_ => {
          this.show = true;
        })
      ;

      this.removeService
        .removeObject
        .subscribe(_ => {
          this.show = false;
        })
      ;
    }

    deleteElement() {
      this.removeService.remove();
    }

    closePopUp() {
      this.show = false;
    }
  }

