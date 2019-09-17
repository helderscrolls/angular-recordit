import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-description-popover',
  templateUrl: './description-popover.component.html',
  styleUrls: ['./description-popover.component.scss']
})
export class DescriptionPopoverComponent {
  /**
   * Object passed in component
   */
  @Input() data;
}
