import {
    EventEmitter,
    Injectable,
    Output,
   } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  @Output()
  showParameterPanelEvent = new EventEmitter();

  @Output()
  checkParameterEvent = new EventEmitter()

  localStorageKeys = [
    'shortcutKeysForStartAndStop',
    'shortcutKeysForSoftwareStart',
    'shortcutKeysForSoftwareStop',
    'shortcutKeysForSoftwareRestart',
    'projectsDirectory',
    'videosDirectory'
  ];

  parameterConfigured: boolean;

  emitShowStatusForParameterPanel(showedStatus) {
    this.showParameterPanelEvent.emit(showedStatus);
  }

  checkParameter() {
    let paramUncompleted: boolean;
    this.localStorageKeys.forEach(key => {
      if (localStorage.getItem(key) === null || localStorage.getItem(key) === '[]') {
        paramUncompleted = true;
      }
    });

    this.parameterConfigured = !paramUncompleted;

    this.checkParameterEvent.emit(this.parameterConfigured);
  }
}
