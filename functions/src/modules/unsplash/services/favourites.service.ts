import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { firestoreDB } from '../../firebase';
import { Photo } from '../models/photo.model';

@Injectable()
export class FavouritesService {
  addToFavourites(photo: Photo, userId: string) {
    return from(
      firestoreDB
        .collection('user_favs')
        .doc(userId)
        .collection('favs')
        .add(photo),
    ).pipe(
      mergeMap(
        (
          ref: FirebaseFirestore.DocumentReference<
            FirebaseFirestore.DocumentData
          >,
        ) => {
          return from(ref.get()).pipe(map(record => record.data()));
        },
      ),
    );
  }

  getFavourites(userId: string) {
    return from(
      firestoreDB
        .collection('user_favs')
        .doc(userId)
        .collection('favs')
        .get(),
    ).pipe(map(record => record.docs.map(doc => doc.data())));
  }

  removeFromFavourites(userId: string, photoId: string) {
    return from(
      firestoreDB
        .collection('user_favs')
        .doc(userId)
        .collection('favs')
        .where('id', '==', photoId)
        .get(),
    ).pipe(
      mergeMap(query => {
        return query.docs.map(doc => {
          return doc.ref.delete();
        });
      }),
    );
  }
}
