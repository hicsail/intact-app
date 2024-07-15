import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
export class UserAssessment {
  @Field()
  assessmentID: string;
  
  @Field()
  score: number;

  @Field()
  dateTaken: Date;
}

@ObjectType()
@Schema()
export class User {
  @Field()
  _id: string;

  @Prop()
  @Field()
  username: string;

  @Prop()
  password: string;

  @Field()
  @Prop()
  birthday: Date;

  @Field()
  @Prop() 
  gender: string;

  @Field()  
  @Prop() 
  phoneNumber: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  language: string;

  @Field()
  @Prop()
  degree: string;

  @Field()
  @Prop()
  assessments: UserAssessment[]
}

export const UserSchema = SchemaFactory.createForClass(User);
