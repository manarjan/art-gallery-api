import { Controller, Get, Query } from '@nestjs/common';
import { UnsplashService } from '../services/unsplash.service';

@Controller('unsplash')
export class UnsplashController {
  constructor(private unsplashService: UnsplashService) {}

  @Get('photos')
  getPhotos(
    @Query('page') page: number = 1,
    @Query('per_page') per_page: number = 12,
    @Query('query') query: string,
  ) {
    return this.unsplashService.getPhotos(page, per_page, query);
  }
}
