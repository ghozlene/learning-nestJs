import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirsMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/logger.middleware';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TodoModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirsMiddleware).forRoutes({
      path: '/todo', method: RequestMethod.GET,
    }, { path: '/todo/*', method: RequestMethod.DELETE })
      .apply(logger).forRoutes('');

  }
}
