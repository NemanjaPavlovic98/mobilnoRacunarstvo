import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Projekat } from './projekti.model';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface projektiDTO {
  datumDo: string,
  datumOd: string,
  imgUrl: string,
  lokacija: string,
  naziv: string
  opis: string,
  timovi: Array<String>,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjektiService {
  private _projekti = new BehaviorSubject<Projekat[]>([]);

  get projekti() {
    return this._projekti.asObservable();
  }

  fetchProjekti() {
    return this.http.get<{ [key: string]: projektiDTO }>('https://mobilno-racunarstvo-3c133-default-rtdb.europe-west1.firebasedatabase.app/izlistani-projekti.json')
      .pipe(map(resData => {
        const projektiSaServera = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            projektiSaServera.push(new Projekat(
              key,
              resData[key].naziv,
              resData[key].opis,
              resData[key].imgUrl,
              resData[key].lokacija,
              resData[key].timovi,
              new Date(resData[key].datumOd),
              new Date(resData[key].datumDo),
              resData[key].userId
            ));
          }
        }
        return projektiSaServera;
      }),
        tap(projekti => {
          this._projekti.next(projekti);
        })
      );
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  getProjekat(id: string) {
    return this.http.get<projektiDTO>(`https://mobilno-racunarstvo-3c133-default-rtdb.europe-west1.firebasedatabase.app/izlistani-projekti/${id}.json`).pipe(
      map(projekatData => {
        return new Projekat(
          id,
          projekatData.naziv,
          projekatData.opis,
          projekatData.imgUrl,
          projekatData.lokacija,
          projekatData.timovi,
          new Date(projekatData.datumOd),
          new Date(projekatData.datumDo),
          projekatData.userId
        );
      })
    );
  }

  addProjekat(
    naziv: string,
    opis: string,
    // imgUrl: string,
    lokacija: string,
    timovi: Array<String>,
    datumOd: Date,
    datumDo: Date,
    // userId: string
  ) {
    let noviId: string;
    let noviProjekat: Projekat;
    return this.authService.userId.pipe(take(1),switchMap(userId => {
      if(!userId){
        throw new Error("Greska, nema usera!");
      }
      noviProjekat = new Projekat(
        Math.random().toString(),
        naziv,
        opis,
        'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
        lokacija,
        timovi,
        datumOd,
        datumDo,
        userId
      );
      return this.http.post<{ name: string }>('https://mobilno-racunarstvo-3c133-default-rtdb.europe-west1.firebasedatabase.app/izlistani-projekti.json', { ...noviProjekat, id: null });
        
    }),
        switchMap(resData => {
          noviId = resData.name;
          return this.projekti;
        }),
        take(1),
        tap(projekti => {
          noviProjekat.id = noviId;
          this._projekti.next(projekti.concat(noviProjekat));
        })
      );
  }


  azurirajProjekat(
    id: string,
    naziv: string,
    opis: string,
    imgUrl: string,
    lokacija: string,
    timovi: Array<String>,
    datumOd: Date,
    datumDo: Date,
    userId: string
  ) {
    let azuriraniProjekti: Projekat[];
    return this.projekti.pipe(
      take(1), switchMap(projekt => {
        if (!projekt || projekt.length <= 0) {
          return this.fetchProjekti();
        } else {
          return of(projekt);
        }
      }),
      switchMap(projekt => {
        const azuriraniIndexProjekta = projekt.findIndex(pr => pr.id === id);
        azuriraniProjekti = [...projekt];
        const stariProjekat = azuriraniProjekti[azuriraniIndexProjekta];
        azuriraniProjekti[azuriraniIndexProjekta] = new Projekat(
          stariProjekat.id,
          naziv,
          opis,
          stariProjekat.imgUrl,
          lokacija,
          timovi,
          datumOd,
          datumDo,
          stariProjekat.userId
        );
        return this.http.put(`https://mobilno-racunarstvo-3c133-default-rtdb.europe-west1.firebasedatabase.app/izlistani-projekti/${id}.json`, { ...azuriraniProjekti[azuriraniIndexProjekta], id: null });
      }),
      tap(() => {
        this._projekti.next(azuriraniProjekti);
      }));
  }
}
