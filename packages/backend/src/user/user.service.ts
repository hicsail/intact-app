import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import { UserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(input: UserInput) {
    const user = new this.userModel({ username: input.username, password: input.password, birthday: input.birthday, gender: input.gender, phoneNumber: input.phoneNumber, email: input.email, language: input.language, degree: input.degree, assessments: input.assessments });
    return user.save();
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async updateUser(id: string, input: UserInput) {
    const user = await this.userModel.updateOne({_id: id}, {  username: input.username, password: input.password, birthday: input.birthday, gender: input.gender, phoneNumber: input.phoneNumber, email: input.email, language: input.language, degree: input.degree, assessments: input.assessments }).exec().then(async () => {
      const updateUser: User = await this.userModel.findById(id).exec();
      return updateUser
    });
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.deleteOne({_id: id}).exec();
    return user.acknowledged;
  }
}
