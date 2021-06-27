import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Projekat } from 'src/app/projekti/projekti.model';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss'],
})
export class PrijavaComponent implements OnInit {
  tim: String;
  @Input()
  izabraniProjekat: Projekat;

  @Input()
  selectedMode: 'select' | 'random';
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.selectedMode === 'random'){
      this.tim = this.izabraniProjekat.timovi[Math.floor(Math.random() * (this.izabraniProjekat.timovi.length - 1) + 1)];
      console.log(this.tim);
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'otkaži');
  }

  onApply(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.modalCtrl.dismiss({ prijava: {
      ime: form.value['first-name'],
      prezime: form.value['last-name'],
      tim: form.value['tim'],
      poruka: form.value['poruka']
    } }, 'potvrdi');
  }
}
