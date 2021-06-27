import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { PrijavaComponent } from 'src/app/prijave/prijava/prijava.component';
import { Projekat } from '../../projekti.model';
import { ProjektiService } from '../../projekti.service';

@Component({
  selector: 'app-detalji-projekta',
  templateUrl: './detalji-projekta.page.html',
  styleUrls: ['./detalji-projekta.page.scss'],
})
export class DetaljiProjektaPage implements OnInit {
  projekat: Projekat;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private projektiServis: ProjektiService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('projekatId')) {
        this.navCtrl.navigateBack('/projekti/tabs/istaknuto');
        return;
      }
      this.projekat = this.projektiServis.getProjekat(paramMap.get('projekatId'));
    });
  }

  prijaviSe() {
    this.actionSheetCtrl
    .create({
      header: 'Opcije',
      buttons: [
        {
          text: 'Izaberi tim',
          handler: () => {
            this.otvoriModal('select');
          }
        },
        {
          text: 'Random tim',
          handler: () => {
            this.otvoriModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  otvoriModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalController.create({ 
      component: PrijavaComponent,
      componentProps: {izabraniProjekat: this.projekat} 
    }).then(modalEl => { 
        modalEl.present(); 
        return modalEl.onDidDismiss();
      }
    ).then( resData => {
      if(resData.role === 'potvrdi'){
        console.log('uspeh!');
      }
    });

  }
}
