import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FavouritesController } from './controllers/favourites.controller';
import { UnsplashController } from './controllers/unsplash.controller';
import { FavouritesService } from './services/favourites.service';
import { UnsplashService } from './services/unsplash.service';
import * as functions from 'firebase-functions';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        headers: {
          Authorization: `Client-ID ${functions.config().api.unsplash_key}`,
        },
      }),
    }),
  ],
  controllers: [UnsplashController, FavouritesController],
  providers: [UnsplashService, FavouritesService],
})
export class UnsplashModule {}
