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
const project_service_1 = require("./project.service");
const create_project_dto_1 = require("./dto/create-project.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    addProject(res, userId, createProjectDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectService.addUserToProject(userId, createProjectDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "Project has been created successfully",
                project
            });
        });
    }
    getAllProject(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.projectService.getAllProject();
            return res.status(common_1.HttpStatus.OK).json(projects);
        });
    }
    getProject(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectService.getProject(id);
            if (!project)
                throw new common_1.NotFoundException('Project does not exist!');
            return res.status(common_1.HttpStatus.OK).json(project);
        });
    }
    updateProject(res, id, createProjectDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectService.updateProject(id, createProjectDTO);
            if (!project)
                throw new common_1.NotFoundException('Project does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Project has been successfully updated',
                project
            });
        });
    }
    deleteProject(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectService.deleteProject(id);
            if (!project)
                throw new common_1.NotFoundException('Project does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Project has been deleted',
                project
            });
        });
    }
};
__decorate([
    common_1.Post(':userId/project'),
    __param(0, common_1.Res()), __param(1, common_1.Param('userId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_project_dto_1.CreateProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "addProject", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProject", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProject", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_project_dto_1.CreateProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
ProjectController = __decorate([
    common_1.Controller('projects'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map