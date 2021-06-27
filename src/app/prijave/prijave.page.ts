import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Prijava } from './prijava.model';
import { PrijaveService } from './prijave.service';

@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.page.html',
  styleUrls: ['./prijave.page.scss'],
})
export class PrijavePage implements OnInit {
  ucitanePrijave: Prijava[];

  constructor(private prijaveService: PrijaveService) { }

  ngOnInit() {
    this.ucitanePrijave = this.prijaveService.prijave;
  }

  onCancelBooking(projekatId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }
}
