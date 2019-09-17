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
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    addUser(res, createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.addUser(createUserDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: "User has been created successfully",
                user
            });
        });
    }
    getAllUser(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUser();
            return res.status(common_1.HttpStatus.OK).json(users);
        });
    }
    getUser(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(id);
            if (!user)
                throw new common_1.NotFoundException('User does not exist!');
            return res.status(common_1.HttpStatus.OK).json(user);
        });
    }
    updateUser(res, id, createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.updateUser(id, createUserDTO);
            if (!user)
                throw new common_1.NotFoundException('User does not exist!');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'User has been successfully updated',
                user
            });
        });
    }
    deleteUser(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.deleteUser(id);
            if (!user)
                throw new common_1.NotFoundException('User does not exist');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'User has been deleted',
                user
            });
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map