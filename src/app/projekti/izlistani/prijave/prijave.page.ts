import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Projekat } from '../../projekti.model';
import { ProjektiService } from '../../projekti.service';


@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.page.html',
  styleUrls: ['./prijave.page.scss'],
})

export class PrijavePage implements OnInit {
  projekat: Projekat;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private projektiServis: ProjektiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if (!param.has('projekatId')) {
        this.navCtrl.navigateBack('/projekti/tabs/izlistani');
        return;
      }
      this.projekat = this.projektiServis.getProjekat(param.get('projekatId'));
    });
  }
}