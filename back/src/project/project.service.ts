import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ProjectModel } from './interfaces/project.interface';
import { CreateProjectDTO } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') 
    private readonly projectModel: Model<ProjectModel>
    ) { }

  // fetch all projects
  async getAllProject(): Promise<ProjectModel[]> {
    const projects = await this.projectModel.find().populate('users').populate({
      path: 'chapters',
      populate: {
        path: 'videos'
      }
    }).exec();
    return projects;
  }

  // Get a single project
  async getProject(id): Promise<ProjectModel> {
    const project = await this.projectModel.findById(id).populate('users').populate('chapters').exec();
    return project;
  }

  // post a single project
  async addProject(createProjectDTO: CreateProjectDTO): Promise<ProjectModel> {
    const newProject = await new this.projectModel(createProjectDTO);
    return newProject.save();
  }

  async addUserToProject(userId, createProjectDTO: CreateProjectDTO): Promise<ProjectModel> {
    
    let newProject 
    await this.addProject(createProjectDTO).then(project => {
      newProject = project
      return newProject;
    }).then(projectToUpdate => {
      let projectUpdated
      projectUpdated = projectToUpdate;
      projectUpdated.users.push(userId);
      this.updateProject(projectUpdated._id, projectToUpdate) 
      console.log('project');
      
    })
    
    return newProject
  }

  // Edit project details
  async updateProject(id, createProjectDTO: CreateProjectDTO): Promise<ProjectModel> {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, createProjectDTO, { new: true });
      
    return updatedProject;
  }

  // Delete a project
  async deleteProject(id): Promise<any> {
    const deletedProject = await this.projectModel.findByIdAndRemove(id);
    return deletedProject;
  }
}