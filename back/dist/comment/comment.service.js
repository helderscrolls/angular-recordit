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
const video_service_1 = require("../video/video.service");
let CommentService = class CommentService {
    constructor(commentModel, videoService) {
        this.commentModel = commentModel;
        this.videoService = videoService;
    }
    getAllComment() {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.commentModel.find().exec();
            return comments;
        });
    }
    getComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentModel.findById(id).exec();
            return comment;
        });
    }
    addComment(createCommentDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = yield new this.commentModel(createCommentDTO);
            return newComment.save();
        });
    }
    addCommentToVideo(videoId, createCommentDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let newComment;
            yield this.addComment(createCommentDTO).then(comment => {
                newComment = comment;
                return newComment;
            }).then(_ => {
                const videoToUpdate = this.videoService.getVideo(videoId);
                return videoToUpdate;
            }).then(videoToUpdate => {
                let videoUpdated;
                videoToUpdate.comments.push(newComment._id);
                videoUpdated = videoToUpdate;
                this.videoService.updateVideo(videoUpdated._id, videoToUpdate);
            });
            return newComment;
        });
    }
    updateComment(id, createCommentDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedComment = yield this.commentModel
                .findByIdAndUpdate(id, createCommentDTO, { new: true });
            return updatedComment;
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedComment = yield this.commentModel.findByIdAndRemove(id);
            return deletedComment;
        });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Comment')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        video_service_1.VideoService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map