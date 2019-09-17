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
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    addComment(res, videoId, createCommentDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentService.addCommentToVideo(videoId, createCommentDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "Comment has been created successfully",
                comment
            });
        });
    }
    getAllComment(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.commentService.getAllComment();
            return res.status(common_1.HttpStatus.OK).json(comments);
        });
    }
    getComment(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentService.getComment(id);
            if (!comment)
                throw new common_1.NotFoundException('Comment does not exist!');
            return res.status(common_1.HttpStatus.OK).json(comment);
        });
    }
    updateComment(res, id, createCommentDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentService.updateComment(id, createCommentDTO);
            if (!comment)
                throw new common_1.NotFoundException('Comment does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Comment has been successfully updated',
                comment
            });
        });
    }
    deleteComment(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentService.deleteComment(id);
            if (!comment)
                throw new common_1.NotFoundException('Comment does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Comment has been deleted',
                comment
            });
        });
    }
};
__decorate([
    common_1.Post(':videoId/comment'),
    __param(0, common_1.Res()), __param(1, common_1.Param('videoId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_comment_dto_1.CreateCommentDTO]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "addComment", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAllComment", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getComment", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_comment_dto_1.CreateCommentDTO]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
CommentController = __decorate([
    common_1.Controller('comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map