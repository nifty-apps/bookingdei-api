import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  _id: ObjectId;
  @Field({ description: 'Name of the user' })
  @Prop({ required: true })
  name: string;
  @Field({ description: 'Email of the user' })
  @Prop({ required: true })
  email: string;
  @Field({ description: 'Phone number of the user' })
  @Prop({ required: true })
  phone: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
