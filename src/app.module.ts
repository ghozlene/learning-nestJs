import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirsMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/logger.middleware';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirsMiddleware, logger).forRoutes({
      path: '/todo', method: RequestMethod.GET,
    }, { path: '/todo/*', method: RequestMethod.DELETE });

  }
}
