import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    addUser(res: any, createUserDTO: CreateUserDTO): Promise<any>;
    getAllUser(res: any): Promise<any>;
    getUser(res: any, id: any): Promise<any>;
    updateUser(res: any, id: any, createUserDTO: CreateUserDTO): Promise<any>;
    deleteUser(res: any, id: any): Promise<any>;
}
