import { Component, OnInit } from '@angular/core';
import { Projekat } from '../projekti.model';
import { ProjektiService } from '../projekti.service';

@Component({
  selector: 'app-istaknuto',
  templateUrl: './istaknuto.page.html',
  styleUrls: ['./istaknuto.page.scss'],
})
export class IstaknutoPage implements OnInit {
  ucitaniProjekti: Projekat[];

  constructor(private projektiServise: ProjektiService) { }

  ngOnInit() {
    this.ucitaniProjekti = this.projektiServise.projekti;
  }

}
