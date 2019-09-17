import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/create-project.dto';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    addProject(res: any, userId: any, createProjectDTO: CreateProjectDTO): Promise<any>;
    getAllProject(res: any): Promise<any>;
    getProject(res: any, id: any): Promise<any>;
    updateProject(res: any, id: any, createProjectDTO: CreateProjectDTO): Promise<any>;
    deleteProject(res: any, id: any): Promise<any>;
}
