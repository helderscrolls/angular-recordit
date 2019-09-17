"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ProjectService = class ProjectService {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    getAllProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.projectModel.find().populate('users').populate('chapters').populate('chapters.videos').exec();
            return projects;
        });
    }
    getProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectModel.findById(id).populate('users').populate('chapters').populate('chapters.videos').exec();
            return project;
        });
    }
    addProject(createProjectDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProject = yield new this.projectModel(createProjectDTO);
            return newProject.save();
        });
    }
    addUserToProject(userId, createProjectDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let newProject;
            yield this.addProject(createProjectDTO).then(project => {
                newProject = project;
                return newProject;
            }).then(projectToUpdate => {
                let projectUpdated;
                projectUpdated = projectToUpdate;
                projectUpdated.users.push(userId);
                this.updateProject(projectUpdated._id, projectToUpdate);
            });
            return newProject;
        });
    }
    updateProject(id, createProjectDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProject = yield this.projectModel
                .findByIdAndUpdate(id, createProjectDTO, { new: true });
            return updatedProject;
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProject = yield this.projectModel.findByIdAndRemove(id);
            return deletedProject;
        });
    }
};
ProjectService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Project')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map