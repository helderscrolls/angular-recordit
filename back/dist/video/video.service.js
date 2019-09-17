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
const chapter_service_1 = require("src/chapter/chapter.service");
let VideoService = class VideoService {
    constructor(videoModel, chapterService) {
        this.videoModel = videoModel;
        this.chapterService = chapterService;
    }
    getAllVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this.videoModel.find().exec();
            return videos;
        });
    }
    getVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield this.videoModel.findById(id).exec();
            return video;
        });
    }
    addVideo(createVideoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVideo = yield new this.videoModel(createVideoDTO);
            return newVideo.save();
        });
    }
    addVideoToChapter(chapterId, createVideoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let newVideo;
            yield this.addVideo(createVideoDTO).then(video => {
                newVideo = video;
                return newVideo;
            }).then(_ => {
                const chapterToUpdate = this.chapterService.getChapter(chapterId);
                return chapterToUpdate;
            }).then(chapterToUpdate => {
                let chapterUpdated;
                chapterToUpdate.videos.push(newVideo._id);
                chapterUpdated = chapterToUpdate;
                this.chapterService.updateChapter(chapterUpdated._id, chapterToUpdate);
            });
            return newVideo;
        });
    }
    updateVideo(id, createVideoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedVideo = yield this.videoModel.findByIdAndUpdate(id, createVideoDTO, { new: true });
            return updatedVideo;
        });
    }
    deleteVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedVideo = yield this.videoModel.findByIdAndRemove(id);
            return deletedVideo;
        });
    }
};
VideoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Video')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        chapter_service_1.ChapterService])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map