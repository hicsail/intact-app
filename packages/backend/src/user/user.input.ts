import {Field, InputType, ObjectType} from '@nestjs/graphql';

@InputType()
export class UserInput {
    @Field()
    username: string;
  
    @Field()
    password: string;
  
    @Field()
    birthday: Date;
  
    @Field()
    gender: string;
  
    @Field()  
    phoneNumber: string;
  
    @Field()
    email: string;
  
    @Field()
    language: string;
  
    @Field()
    degree: string;
  
    @Field()
    assessments: UserAssessment[]
}

@InputType()
export class UserAssessment {
    @Field()
    assessmentID: string;
    
    @Field()
    score: number;
  
    @Field()
    dateTaken: Date;
}
