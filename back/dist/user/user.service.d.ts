import { Model } from 'mongoose';
import { UserModel } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserModel>);
    getAllUser(): Promise<UserModel[]>;
    getUser(id: any): Promise<UserModel>;
    addUser(createUserDTO: CreateUserDTO): Promise<UserModel>;
    updateUser(id: any, createUserDTO: CreateUserDTO): Promise<UserModel>;
    deleteUser(id: any): Promise<any>;
}
