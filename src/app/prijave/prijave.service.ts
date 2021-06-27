import { Injectable } from '@angular/core';
import { Prijava } from './prijava.model';

@Injectable({
  providedIn: 'root'
})
export class PrijaveService {
  private _prijave: Prijava[] = [
    {
      id: "1p",
      projekatId: "p1",
      userId: "u1",
      nazivProjekta: "FON Hakaton",
      brojPrijava: 20
    },
    {
      id: "2p",
      projekatId: "p1",
      userId: "u2",
      nazivProjekta: "FON Hakaton",
      brojPrijava: 21
    }
  ];

  constructor() { }

  get prijave() {
    return [...this._prijave];
  }
}
