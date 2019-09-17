import { Injectable, Output, EventEmitter } from '@angular/core';

/**
* This class provides the Remove service to handle remove of objects.
*/
@Injectable({
  providedIn: 'root'
})
export class RemoveService {
  @Output() displayRemove = new EventEmitter();
  @Output() removeObject = new EventEmitter();

  objectToRemove;

  remove() {
    this.removeObject.emit(this.objectToRemove);
  }

  display(objectToRemove) {
    this.objectToRemove = objectToRemove;

    this.displayRemove.emit();
  }
}
