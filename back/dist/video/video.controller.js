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
const video_service_1 = require("./video.service");
const create_video_dto_1 = require("./dto/create-video.dto");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    addVideo(res, chapterId, createVideoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield this.videoService.addVideoToChapter(chapterId, createVideoDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "Video has been created successfully",
                video
            });
        });
    }
    getAllVideo(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this.videoService.getAllVideo();
            return res.status(common_1.HttpStatus.OK).json(videos);
        });
    }
    getVideo(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield this.videoService.getVideo(id);
            if (!video)
                throw new common_1.NotFoundException('Video does not exist!');
            return res.status(common_1.HttpStatus.OK).json(video);
        });
    }
    updateVideo(res, id, createVideoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield this.videoService.updateVideo(id, createVideoDTO);
            if (!video)
                throw new common_1.NotFoundException('Video does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Video has been successfully updated',
                video
            });
        });
    }
    deleteVideo(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield this.videoService.deleteVideo(id);
            if (!video)
                throw new common_1.NotFoundException('Video does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Video has been deleted',
                video
            });
        });
    }
};
__decorate([
    common_1.Post(':chapterId/video'),
    __param(0, common_1.Res()), __param(1, common_1.Param('chapterId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_video_dto_1.CreateVideoDTO]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "addVideo", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getAllVideo", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideo", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_video_dto_1.CreateVideoDTO]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "updateVideo", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "deleteVideo", null);
VideoController = __decorate([
    common_1.Controller('videos'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
exports.VideoController = VideoController;
//# sourceMappingURL=video.controller.js.map