import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Projekat } from './projekti.model';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjektiService {
  private _projekti = new BehaviorSubject<Projekat[]>([
    new Projekat(
      "p1",
      "FON Hakaton",
      "Neki kratki opis projekta FON Hakaton",
      "https://startit.rs/media/fon-hakaton-fb.jpg",
      "Fakultet organizacionih nauka",
      ["IT", "Dizajn", "HR", "PR", "CR", "Logistika"],
      new Date('2021-10-10'),
      new Date('2021-10-10'),
      "abc"
    ),
    new Projekat(
      "p2",
      "Hakaton za srednjoskolce",
      "Neki kratki opis projekta Hakaton za srednjoskolce",
      "https://startit.rs/media/fon-hakaton-fb.jpg",
      "Fakultet organizacionih nauka",
      ["IT", "Dizajn", "HR", "PR", "CR", "Logistika"],
      new Date('2021-10-10'),
      new Date('2021-10-10'),
      "abc"
    )
  ]);

  get projekti() {
    return this._projekti.asObservable();

  }

  constructor(private authService: AuthService) { }

  getProjekat(id: string) {
    return this.projekti.pipe(
      take(1),
      map(projekti => {
        return { ...projekti.find(p => p.id === id) };
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
    userId: string
  ) {
    const noviProjekat = new Projekat(
      Math.random().toString(),
      naziv,
      opis,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      lokacija,
      timovi,
      datumOd,
      datumDo,
      this.authService.userId
    );

    console.log(noviProjekat);
    console.log(this._projekti);
    return this.projekti.pipe(take(1), tap((projekt) => {
      this._projekti.next(projekt.concat(noviProjekat));
    }));
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
    return this.projekti.pipe(
      take(1),
      tap(projekt => {
        const azuriraniIndexProjekta = projekt.findIndex(pr => pr.id === id);
        const azuriraniProjekti = [...projekt];
        const stariProjekat = azuriraniProjekti[azuriraniIndexProjekta];
        azuriraniProjekti[azuriraniIndexProjekta] = new Projekat(
          id,
          naziv,
          opis,
          imgUrl,
          lokacija,
          timovi,
          datumOd,
          datumDo,
          userId
        );
        console.log("NOVI")
        console.log(azuriraniProjekti);
        this._projekti.next(azuriraniProjekti);
      })
    );
  }
}
