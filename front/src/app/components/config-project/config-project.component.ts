import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  FormBuilder,
  Validators,
} from '@angular/forms';

import { ActualProjectService } from './../../services/actual-project.service';
import { ConfigPanelsService } from '../../services/config-panels.service';
import { DisplayPanelsService } from './../../services/display-panel.service';
import { InfoService } from './../../services/info.service';
import { ParameterService } from './../../services/parameter.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-config-project',
  templateUrl: './config-project.component.html',
  styleUrls: ['./config-project.component.scss']
})
export class ConfigProjectComponent implements OnInit {
  @Input() configIndexPanelStatus: boolean;

  activeConfigIndex;
  activeConfigProject;
  displayOverlay: boolean;
  infoForm: any;
  parameterConfigured: boolean;

  constructor(
    private actualProjectService: ActualProjectService,
    private configPanelsService: ConfigPanelsService,
    private formBuilder: FormBuilder,
    private infoService: InfoService,
    private projectService: ProjectsService,
    private parameterService: ParameterService,
    public displayPanelsService: DisplayPanelsService,
  ) {}

  ngOnInit() {
    this.parameterService.checkParameterEvent.subscribe(parameter => {
      this.parameterConfigured = parameter;
    });

    this.displayPanelsService.displayPanelEvent.subscribe(panel => {
      if (panel === "configProject") {
        this.displayOverlay = true;
      } else {
        this.displayOverlay = false;
      }
    })

    this.parameterService.checkParameter();

    this.initForm();
  }

  initForm() {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.required],
      options: ['', [Validators.required]],
      exerciceDirectory: ['', [Validators.required]],
    });
  }

  excercicePath() {
    const input: any = document.querySelector('input#exerciceDir');
    input.click();
  }

  diplayParameterPanel() {
    this.displayPanelsService.displayPanel('parameter');
  }

  completeIndex() {

    if (this.infoForm.valid) {
      event.preventDefault();

      let project = {...this.infoForm.value};
      project = this.projectService.postProject(project);
      this.configPanelsService.emitShowStatusForConfigIndexPanel(true);

      this.infoService.displayProjects(); //comprendre ce que sa fait ???
      this.initForm();

      this.displayPanelsService.displayPanel('configIndex');
    }
  }
}
