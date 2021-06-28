import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProjektiService } from '../../projekti.service';

@Component({
  selector: 'app-kreiraj-projekat',
  templateUrl: './kreiraj-projekat.page.html',
  styleUrls: ['./kreiraj-projekat.page.scss'],
})
export class KreirajProjekatPage implements OnInit {
  form: FormGroup;
  constructor(private projekatService: ProjektiService, private loader: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      naziv: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      opis: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      lokacija: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      tim: new FormControl(null, {
        updateOn: 'blur',
        validators: Validators.required
      }),
      datumOd: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      datumDo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateProjekat() {
    if (!this.form.valid)
      return;
    this.loader.create({
      message: 'Pravi se projekat...'
    }).then(loadingEl => {
      loadingEl.present();
      this.projekatService.addProjekat(
        this.form.value.naziv, this.form.value.opis, this.form.value.lokacija,
        new Array<String>(...this.form.value.tim), new Date(this.form.value.datumOd), new Date(this.form.value.datumDo)
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/projekti/tabs/izlistani']);
      });
    });
  }
}
