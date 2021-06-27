import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Projekat } from '../../projekti.model';
import { ProjektiService } from '../../projekti.service';

type NewType = Subscription;

@Component({
  selector: 'app-izmeni-projekat',
  templateUrl: './izmeni-projekat.page.html',
  styleUrls: ['./izmeni-projekat.page.scss'],
})
export class IzmeniProjekatPage implements OnInit {
  projekat: Projekat;
  private subskr: NewType;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projekatServis: ProjektiService,
    private navCtrl: NavController,
    private router: Router,
    private loader: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('projekatId')) {
        this.navCtrl.navigateBack('/projekti/tabs/izlistani');
        return;
      }
      this.subskr = this.projekatServis.getProjekat(paramMap.get('projekatId')).subscribe(projekat => {
        this.projekat = projekat;

        this.form = new FormGroup({
          naziv: new FormControl(this.projekat.naziv, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          opis: new FormControl(this.projekat.opis, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          }),
          lokacija: new FormControl(this.projekat.lokacija, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.min(1)]
          }),
          tim: new FormControl([...this.projekat.timovi.map(x => x.toLowerCase())], {
            updateOn: 'blur',
            validators: Validators.required
          }),
          datumOd: new FormControl(
            new Date(this.projekat.datumOd).toISOString(), {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          datumDo: new FormControl(
            new Date(this.projekat.datumDo).toISOString(), {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subskr)
      this.subskr.unsubscribe();
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loader.create({
      message: "Azuriranje..."
    }).then(loadin => {
      loadin.present();
      console.log(this.form);
      this.projekatServis.azurirajProjekat(
        this.projekat.id,
        this.form.value.naziv,
        this.form.value.opis,
        this.projekat.imgUrl,
        this.form.value.lokacija,
        this.form.value.timovi,
        this.form.value.datumOd,
        this.form.value.datumDo,
        this.projekat.userId
      ).subscribe(() => {
        loadin.dismiss();
        this.form.reset;
        this.router.navigate(['/projekti/tabs/izlistani']);
      });
    });
  }

}
