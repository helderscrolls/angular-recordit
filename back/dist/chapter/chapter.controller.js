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
const chapter_service_1 = require("./chapter.service");
const create_chapter_dto_1 = require("./dto/create-chapter.dto");
let ChapterController = class ChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    addChapter(res, projectId, createChapterDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield this.chapterService.addChapterToProject(projectId, createChapterDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "Chapter has been created successfully",
                chapter
            });
        });
    }
    getAllChapter(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapters = yield this.chapterService.getAllChapter();
            return res.status(common_1.HttpStatus.OK).json(chapters);
        });
    }
    getChapter(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield this.chapterService.getChapter(id);
            if (!chapter)
                throw new common_1.NotFoundException('Chapter does not exist!');
            return res.status(common_1.HttpStatus.OK).json(chapter);
        });
    }
    updateChapter(res, id, createChapterDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield this.chapterService.updateChapter(id, createChapterDTO);
            if (!chapter)
                throw new common_1.NotFoundException('Chapter does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Chapter has been successfully updated',
                chapter
            });
        });
    }
    deleteChapter(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield this.chapterService.deleteChapter(id);
            if (!chapter)
                throw new common_1.NotFoundException('Chapter does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Chapter has been deleted',
                chapter
            });
        });
    }
};
__decorate([
    common_1.Post(':projectId/chapter'),
    __param(0, common_1.Res()), __param(1, common_1.Param('projectId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_chapter_dto_1.CreateChapterDTO]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "addChapter", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getAllChapter", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getChapter", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_chapter_dto_1.CreateChapterDTO]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "updateChapter", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "deleteChapter", null);
ChapterController = __decorate([
    common_1.Controller('chapters'),
    __metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
exports.ChapterController = ChapterController;
//# sourceMappingURL=chapter.controller.js.map