import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Projekat } from '../../projekti.model';
import { ProjektiService } from '../../projekti.service';


@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.page.html',
  styleUrls: ['./prijave.page.scss'],
})

export class PrijavePage implements OnInit, OnDestroy {
  projekat: Projekat;
  private subskr: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private projektiServis: ProjektiService
  ) { }

  ngOnDestroy(): void {
    if(this.subskr)
      this.subskr.unsubscribe();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if (!param.has('projekatId')) {
        this.navCtrl.navigateBack('/projekti/tabs/izlistani');
        return;
      }
      this.subskr = this.projektiServis.getProjekat(param.get('projekatId')).subscribe(projekat => {
        this.projekat = projekat;
      }
      );
    });
  }
}