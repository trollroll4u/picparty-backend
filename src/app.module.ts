import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './modules/comment.module';
import { Comment } from './entities/comment.entity'
// import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    // UserModule,
    // PictureModule,
    // EventModule,
    CommentModule,
    // ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'picparty-db.cpu6q6osqn9z.eu-central-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: '123123123',
      database: 'postgres',
      ssl: {
        rejectUnauthorized: false,
        ca: './us-east-1-bundle.pem',
      },
      entities: [Comment],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}