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
const project_service_1 = require("src/project/project.service");
let ChapterService = class ChapterService {
    constructor(chapterModel, projectService) {
        this.chapterModel = chapterModel;
        this.projectService = projectService;
    }
    getAllChapter() {
        return __awaiter(this, void 0, void 0, function* () {
            const chapters = yield this.chapterModel.find().exec();
            return chapters;
        });
    }
    getChapter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield this.chapterModel.findById(id).exec();
            return chapter;
        });
    }
    addChapter(createChapterDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newChapter = yield new this.chapterModel(createChapterDTO);
            return newChapter.save();
        });
    }
    addChapterToProject(projectId, createChapterDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let newChapter;
            yield this.addChapter(createChapterDTO).then(chapter => {
                newChapter = chapter;
                return newChapter;
            }).then(_ => {
                const projectToUpdate = this.projectService.getProject(projectId);
                return projectToUpdate;
            }).then(projectToUpdate => {
                let projectUpdated;
                projectToUpdate.chapters.push(newChapter._id);
                projectUpdated = projectToUpdate;
                this.projectService.updateProject(projectUpdated._id, projectToUpdate);
            });
            return newChapter;
        });
    }
    updateChapter(id, createChapterDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedChapter = yield this.chapterModel
                .findByIdAndUpdate(id, createChapterDTO, { new: true });
            return updatedChapter;
        });
    }
    deleteChapter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedChapter = yield this.chapterModel.findByIdAndRemove(id);
            return deletedChapter;
        });
    }
};
ChapterService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Chapter')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        project_service_1.ProjectService])
], ChapterService);
exports.ChapterService = ChapterService;
//# sourceMappingURL=chapter.service.js.map