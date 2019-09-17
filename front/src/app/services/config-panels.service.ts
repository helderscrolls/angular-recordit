import { Injectable } from '@angular/core';
import {
    EventEmitter,
    Output,
  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigPanelsService {
  @Output() saveEvent = new EventEmitter();
  @Output() showConfigProjectPanelEvent = new EventEmitter();
  @Output() showConfigIndexPanelEvent = new EventEmitter();

  emitSaveEvent() {
    this.saveEvent.emit();
  }

  emitShowStatusForConfigProjectPanel(showConfigProjectStatus) {
    this.showConfigProjectPanelEvent.emit(showConfigProjectStatus);
  }

  emitShowStatusForConfigIndexPanel (showConfigIndexStatus) {
    this.showConfigIndexPanelEvent.emit(showConfigIndexStatus);
  }
}
