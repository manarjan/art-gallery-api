import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { firebaseApp } from './modules/firebase';
import { UnsplashModule } from './modules/unsplash/unsplash.module';

@Module({
  imports: [
    UnsplashModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    const app = firebaseApp;
  }
}
