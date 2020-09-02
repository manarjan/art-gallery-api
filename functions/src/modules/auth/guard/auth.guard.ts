import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { auth } from 'firebase-admin';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Observable<boolean> | boolean {
    let token = context.switchToHttp().getRequest().headers['authorization'];

    if (!token) {
      throw new UnauthorizedException();
    }
    return from(auth().verifyIdToken(token)).pipe(
      map((decoded: auth.DecodedIdToken) => {
        if (!!decoded.uid) {
          context.switchToHttp().getRequest().user = decoded;
          return true;
        } else {
          throwError(new UnauthorizedException());
          return false;
        }
      }),
      catchError(err => {
        return throwError(new UnauthorizedException());
      }),
    );
  }
}
