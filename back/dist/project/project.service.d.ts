import { Model } from 'mongoose';
import { Project } from './interfaces/project.interface';
import { CreateProjectDTO } from './dto/create-project.dto';
export declare class ProjectService {
    private readonly projectModel;
    constructor(projectModel: Model<Project>);
    getAllProject(): Promise<Project[]>;
    getProject(id: any): Promise<Project>;
    addProject(createProjectDTO: CreateProjectDTO): Promise<Project>;
    addUserToProject(userId: any, createProjectDTO: CreateProjectDTO): Promise<Project>;
    updateProject(id: any, createProjectDTO: CreateProjectDTO): Promise<Project>;
    deleteProject(id: any): Promise<any>;
}
