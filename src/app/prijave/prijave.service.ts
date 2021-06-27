import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Prijava } from './prijava.model';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface prijaveServer {
  ime: string,
  imgProjekta: string,
  nazivProjekta: string,
  poruka: string,
  prezime: string,
  projekatId: string,
  tim: string,
  userId: string,

}

@Injectable({
  providedIn: 'root'
})
export class PrijaveService {
  private _prijave = new BehaviorSubject<Prijava[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get prijave() {
    return this._prijave.asObservable();
  }

  prijaviSe(
    projekatId: string,
    nazivProjekta: string,
    imgProjekta: string,
    ime: string,
    prezime: string,
    tim: string,
    poruka: string
  ) {
    let generatedId: string;
    const novaPrijava = new Prijava(
      Math.random().toString(),
      projekatId,
      this.authService.userId,
      nazivProjekta,
      imgProjekta,
      ime,
      prezime,
      tim,
      poruka
    );
    return this.http.post<{ name: string }>('https://mobilno-racunarstvo-3c133-default-rtdb.europe-west1.firebasedatabase.app/prijave.json',
      { ...novaPrijava, id: null }).pipe(switchMap(resData => {
        generatedId = resData.name;
        return this.prijave;
      }), take(1), tap(prijve => {
        novaPrijava.id = generatedId;
        this._prijave.next(prijve.concat(novaPrijava));
      })
      );
  }

  fetchPrijave() {
    return this.http
      .get<{ [key: string]: prijaveServer }>(
        `https://mobilno-racunarstvo-3c133-default-rtdb.europe-west1.firebasedatabase.app/prijave.json?orderBy="userId"&equalTo="${this.authService.userId
        }"`
      )
      .pipe(
        map(prijaveServer => {
          const prijave = [];
          for (const key in prijaveServer) {
            if (prijaveServer.hasOwnProperty(key)) {
              prijave.push(
                new Prijava(
                  key,
                  prijaveServer[key].projekatId,
                  prijaveServer[key].userId,
                  prijaveServer[key].nazivProjekta,
                  prijaveServer[key].imgProjekta,
                  prijaveServer[key].ime,
                  prijaveServer[key]. prezime,
                  prijaveServer[key].tim,
                  prijaveServer[key].poruka
                )
              );
            }
          }
          return prijave;
        }),
        tap(bookings => {
          this._prijave.next(bookings);
        })
      );
  }

  otkaziPrijavu(prijavaId: string) {
    return this.http
      .delete(
        `https://mobilno-racunarstvo-3c133-default-rtdb.europe-west1.firebasedatabase.app/prijave/${prijavaId}.json`
      )
    .pipe(
      switchMap(() => {
        return this.prijave;
      }),
      take(1),
      tap(prijve => {
        this._prijave.next(prijve.filter(p => p.id !== prijavaId));
      })
    );
  }
}
