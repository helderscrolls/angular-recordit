import {
  Component,
  OnInit
} from '@angular/core';

import hotkeys from 'hotkeys-js';

import { ParameterService } from './../../services/parameter.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {
  infoForm: any;
  projectsDirectory: any;
  projectsDirectoryType = 'text';
  videosDirectory: any;
  videosDirectoryType = 'text';

  shortcutsCollection = [
    {
      label: `Lancer/arrêter l'enregistrement`,
      localStorage: 'shortcutKeysForStartAndStop',
      shortcut: '',
      isActive: false
    },
    {
      label: 'Lancer dans le logiciel',
      localStorage: 'shortcutKeysForSoftwareStart',
      shortcut: '',
      isActive: false
    },
    {
      label: 'Arrêter dans le logiciel',
      localStorage: 'shortcutKeysForSoftwareStop',
      shortcut: '',
      isActive: false
    },
    {
      label: 'Recommencer dans le logiciel',
      localStorage: 'shortcutKeysForSoftwareRestart',
      shortcut: '',
      isActive: false
    },
  ];

  constructor(
    private parameterService: ParameterService,
  ) {}

  ngOnInit() {
    this.projectsDirectory = localStorage.getItem('projectsDirectory');
    this.videosDirectory = localStorage.getItem('videosDirectory');

    this.shortcutsCollection.forEach(shortcut => {
      const shortcutOnStorage = localStorage.getItem(shortcut.localStorage);
      shortcut.shortcut = shortcutOnStorage ? JSON.parse(shortcutOnStorage) : [];
    });
  }

  clickOnVideosDirectory() {
    const input: any = document.querySelector('input#videosDirectory');
    input.click();
  }

  clickOnProjectsDirectory() {
    const input: any = document.querySelector('input#projectsDirectory');
    input.click();
  }

  recordShortcut(shortcut) {
    shortcut.isActive = true;
    shortcut.shortcut = [];

    hotkeys('*', (event, handler) => {
      // Prevent the default refresh event under WINDOWS system
      event.preventDefault();

      const key = event.key
        .replace('Meta', 'command')
        .replace('Alt', 'option')
        .replace('Control', 'control')
        .replace('Shift', 'shift')
      ;

      if (shortcut.shortcut.length > 3) {
        return this.clearShotcut(shortcut);
      }

      shortcut.shortcut.push(key);
    });
  }

  stopShortcutRecord(shortcut) {
    localStorage.setItem(shortcut.localStorage, JSON.stringify(shortcut.shortcut));
    shortcut.isActive = false;
    hotkeys.unbind('*');
    this.parameterService.checkParameter();
  }

  clearShotcut(shortcut) {
    shortcut.shortcut = [];
  }

  saveToLocalStorage(key) {
    const value = this[key];
    localStorage.setItem(key, value);
    this.parameterService.checkParameter();
  }
}
