import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PhotosDto } from '../dto/photo.dto';
import { Photo, Search } from '../models/photo.model';

@Injectable()
export class UnsplashService {
  constructor(private http: HttpService) {}

  getPhotos(
    page: number,
    per_page: number,
    query?: string,
  ): Observable<PhotosDto> {
    if (!query) {
      return this.http
        .get<Photo[]>(environment.api.photos, {
          params: {
            page,
            per_page,
          },
        })
        .pipe(
          map(resp => {
            return {
              total: resp.headers['x-total'],
              data: resp.data,
            };
          }),
        );
    } else {
      return this.http
        .get<Search>(environment.api.search, {
          params: {
            page,
            per_page,
            query,
          },
        })
        .pipe(
          map(resp => {
            return {
              total: resp.data.total,
              data: resp.data.results,
            };
          }),
        );
    }
  }
}
