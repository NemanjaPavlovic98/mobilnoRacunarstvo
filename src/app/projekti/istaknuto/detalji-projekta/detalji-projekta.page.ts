import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PrijavaComponent } from 'src/app/prijave/prijava/prijava.component';
import { PrijaveService } from 'src/app/prijave/prijave.service';
import { Projekat } from '../../projekti.model';
import { ProjektiService } from '../../projekti.service';

@Component({
  selector: 'app-detalji-projekta',
  templateUrl: './detalji-projekta.page.html',
  styleUrls: ['./detalji-projekta.page.scss'],
})
export class DetaljiProjektaPage implements OnInit, OnDestroy {
  private subskr: Subscription;
  projekat: Projekat;
  isLoading = false;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private projektiServis: ProjektiService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private prijaveService: PrijaveService,
    private loader: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('projekatId')) {
        this.navCtrl.navigateBack('/projekti/tabs/istaknuto');
        return;
      }
      this.isLoading = true;
      this.subskr = this.projektiServis.getProjekat(paramMap.get('projekatId')).subscribe(projekat => {
        this.projekat = projekat;
        console.log(this.projekat);
        this.isLoading = false;
      }, error => {
        this.alertCtrl
          .create({
            header: 'Greska!',
            message: 'Pokusaj opet kasnije',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.router.navigate(['/projekti/tabs/istaknuto']);
                }
              }
            ]
          })
          .then(alertEl => {
            alertEl.present();
          });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subskr)
      this.subskr.unsubscribe();
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
      componentProps: { izabraniProjekat: this.projekat, selectedMode: mode }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }
    ).then(resData => {
      if (resData.role === 'potvrdi') {
        this.loader.create({ message: "Saceckaj..." }).then(loadingEl => {
          loadingEl.present();
          const data = resData.data.prijava;
          this.prijaveService.prijaviSe(
            this.projekat.id,
            this.projekat.naziv,
            this.projekat.imgUrl,
            data.ime,
            data.prezime,
            data.tim,
            data.poruka
          ).subscribe(() => {
            loadingEl.dismiss();
          });
        });
      }
    });

  }
}
