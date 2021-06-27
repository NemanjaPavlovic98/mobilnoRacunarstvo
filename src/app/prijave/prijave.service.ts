import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Prijava } from './prijava.model';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PrijaveService {
  private _prijave = new BehaviorSubject<Prijava[]>([]);

  constructor(private authService:AuthService) { }

  get prijave() {
    return this._prijave.asObservable();
  }

  prijaviSe(
    projekatId:string,
    nazivProjekta: string,
    imgProjekta: string,
    ime: string,
    prezime: string,
    tim: string,
    poruka: string
  ){
    const novaPrijava  =  new Prijava(
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
    return this.prijave.pipe(
      take(1),
      tap(prijve => {
        this._prijave.next(prijve.concat(novaPrijava));
      })
    );
  }

  otkaziPrijavu(prijavaId: string){
    return this.prijave.pipe(
      take(1),
      tap(prijve => {
        this._prijave.next(prijve.filter( p  => p.id  !== prijavaId));
      })
    );
  }
}
