import { Component, OnInit } from '@angular/core';
import { Projekat } from '../projekti.model';
import { ProjektiService } from '../projekti.service';

@Component({
  selector: 'app-izlistani',
  templateUrl: './izlistani.page.html',
  styleUrls: ['./izlistani.page.scss'],
})
export class IzlistaniPage implements OnInit {
  izlistaniProjekti: Projekat[];
  
  constructor(private projektiServise: ProjektiService) { }

  ngOnInit() {
    this.izlistaniProjekti = this.projektiServise.projekti;
  }

}
