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
const video_schema_1 = require("./schemas/video.schema");
const video_service_1 = require("./video.service");
const video_controller_1 = require("./video.controller");
const chapter_service_1 = require("src/chapter/chapter.service");
const chapter_module_1 = require("src/chapter/chapter.module");
const project_service_1 = require("src/project/project.service");
let VideoModule = class VideoModule {
};
VideoModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Video', schema: video_schema_1.VideoSchema }]),
            chapter_module_1.ChapterModule
        ],
        providers: [
            project_service_1.ProjectService,
            chapter_service_1.ChapterService,
            video_service_1.VideoService
        ],
        controllers: [video_controller_1.VideoController]
    })
], VideoModule);
exports.VideoModule = VideoModule;
//# sourceMappingURL=video.module.js.map