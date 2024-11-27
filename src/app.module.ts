import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CustomLoggerModule } from './logger/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomHttpExceptionModule } from './exception-filter/custom-http-exception.module';
import { CustomHttpExceptionFilter } from './exception-filter/custom-http-exception.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    CustomLoggerModule,
    CustomHttpExceptionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
