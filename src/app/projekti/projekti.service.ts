import { Injectable } from '@angular/core';
import { Projekat } from './projekti.model';

@Injectable({
  providedIn: 'root'
})
export class ProjektiService {
  private _projekti: Projekat[] = [
    new Projekat(
      "p1",
      "FON Hakaton",
      "Neki kratki opis projekta FON Hakaton",
      "https://startit.rs/media/fon-hakaton-fb.jpg",
      "Fakultet organizacionih nauka",
      ["IT", "Dizajn", "HR", "PR", "CR", "Logistika"],
      new Date('2021-10-10'),
      new Date('2021-10-10')
    ),
    new Projekat(
      "p2",
      "Hakaton za srednjoskolce",
      "Neki kratki opis projekta Hakaton za srednjoskolce",
      "https://startit.rs/media/fon-hakaton-fb.jpg",
      "Fakultet organizacionih nauka",
      ["IT", "Dizajn", "HR", "PR", "CR", "Logistika"],
      new Date('2021-10-10'),
      new Date('2021-10-10')
    )
  ];

  get projekti() {
    return [...this._projekti];
  }

  constructor() { }

  getProjekat(id: string) {
    return {...this._projekti.find(p => p.id === id)};
  }


}
