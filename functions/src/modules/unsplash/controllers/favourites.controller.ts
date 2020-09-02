import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { Photo } from '../models/photo.model';
import { FavouritesService } from '../services/favourites.service';

@Controller('favourites')
export class FavouritesController {
  constructor(private favouritesService: FavouritesService) {}

  @Post()
  addToFavourites(
    @Body() photo: Photo,
    @CurrentUser() user: auth.DecodedIdToken,
  ) {
    return this.favouritesService.addToFavourites(photo, user.uid);
  }

  @Get()
  getFavourites(@CurrentUser() user: auth.DecodedIdToken) {
    return this.favouritesService.getFavourites(user.uid);
  }

  @Delete(':id')
  removeFromFavourites(
    @CurrentUser() user: auth.DecodedIdToken,
    @Param('id') photoId: string,
  ) {
    return this.favouritesService.removeFromFavourites(user.uid, photoId);
  }
}
