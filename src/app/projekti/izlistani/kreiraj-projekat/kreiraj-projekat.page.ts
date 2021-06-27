import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kreiraj-projekat',
  templateUrl: './kreiraj-projekat.page.html',
  styleUrls: ['./kreiraj-projekat.page.scss'],
})
export class KreirajProjekatPage implements OnInit {
  form: FormGroup; 
  constructor() { }

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
    if(!this.form.valid)
      return;
    console.log(this.form);
  }
}
