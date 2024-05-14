// comment.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Comment {

  @ApiProperty() // Use lazy loading for User
  @Column()
  userName: string;

  @ApiProperty()
  @Column({
    nullable: true
  })
  pic_file?: string;

  @ApiProperty()
  @Column()
  comment: string;

  @ApiProperty()
  @PrimaryGeneratedColumn()
  commentId: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
