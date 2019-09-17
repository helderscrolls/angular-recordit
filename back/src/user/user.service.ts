import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserModel } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserModel>) { }

  // fetch all users
  async getAllUser(): Promise<UserModel[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  // Get a single user
  async getUser(id): Promise<UserModel> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  // post a single user
  async addUser(createUserDTO: CreateUserDTO): Promise<UserModel> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  // Edit user details
  async updateUser(id, createUserDTO: CreateUserDTO): Promise<UserModel> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, createUserDTO, { new: true });
    return updatedUser;
  }
  
  // Delete a user
  async deleteUser(id): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(id);
    return deletedUser;
  }
}