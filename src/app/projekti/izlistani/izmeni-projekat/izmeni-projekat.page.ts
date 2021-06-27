import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Projekat } from '../../projekti.model';
import { ProjektiService } from '../../projekti.service';

@Component({
  selector: 'app-izmeni-projekat',
  templateUrl: './izmeni-projekat.page.html',
  styleUrls: ['./izmeni-projekat.page.scss'],
})
export class IzmeniProjekatPage implements OnInit {
  projekat: Projekat;
  form: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private projekatServis: ProjektiService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('projekatId')) {
        this.navCtrl.navigateBack('/projekti/tabs/izlistani');
        return;
      }
      this.projekat = this.projekatServis.getProjekat(paramMap.get('projekatId'));

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
        // tim: new FormControl(null, {
        //   updateOn: 'blur',
        //   validators: Validators.required
        // }),
        // datumOd: new FormControl(null, {
        //   updateOn: 'blur',
        //   validators: [Validators.required]
        // }),
        // datumDo: new FormControl(null, {
        //   updateOn: 'blur',
        //   validators: [Validators.required]
        // })
      });
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }

}
