import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): any {
    return moment().startOf('day').seconds(value).format('HH:mm:ss');
  }
}
