import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Projekat } from 'src/app/projekti/projekti.model';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss'],
})
export class PrijavaComponent implements OnInit {

  @Input()
  izabraniProjekat: Projekat;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'otkaži');
  }

  onApply() {
    this.modalCtrl.dismiss({ message: 'This is a dummy message!' }, 'potvrdi');
  }
}
