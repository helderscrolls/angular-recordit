import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayPanelsService {
  @Output() closeAllPanelsEvent = new EventEmitter();
  @Output() displayPanelEvent = new EventEmitter();

  activePanel: boolean;
  isActive;
  panels = {
    projectsList: false,
    configProject: false,
    configIndex: false,
    parameter: false,
    getReady: false,
    record: false,
    validateProject: false,
    description: false,
  };

  displayPanel(panelToActivate) {
    this.panels[panelToActivate] = true;
    this.isActive = true;

    this.displayPanelEvent.emit(panelToActivate);

    return this.activePanel = !this.activePanel;
  }

  closeAll() {
    this.panels = {
      projectsList: false,
      configProject: false,
      configIndex: false,
      parameter: false,
      getReady: false,
      record: false,
      validateProject: false,
      description: false,
    };

    this.closeAllPanelsEvent.emit();

    this.isActive = false;

    return this.activePanel = !this.activePanel;
  }

  closePanel(panelToDisable) {
    this.panels[panelToDisable] = false;
  }
}

