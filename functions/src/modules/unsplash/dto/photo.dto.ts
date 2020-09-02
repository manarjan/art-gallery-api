import { Photo } from '../models/photo.model';

export class PhotosDto {
  total!: number;
  data!: Photo[];
}
