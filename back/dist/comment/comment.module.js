"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const video_module_1 = require("src/video/video.module");
const video_service_1 = require("src/video/video.service");
const project_service_1 = require("dist/project/project.service");
const chapter_service_1 = require("src/chapter/chapter.service");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Comment', schema: comment_schema_1.CommentSchema }]),
            video_module_1.VideoModule
        ],
        providers: [
            project_service_1.ProjectService,
            chapter_service_1.ChapterService,
            video_service_1.VideoService,
            comment_service_1.CommentService
        ],
        controllers: [comment_controller_1.CommentController]
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map