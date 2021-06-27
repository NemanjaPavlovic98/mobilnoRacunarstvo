import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Prijava } from './prijava.model';
import { PrijaveService } from './prijave.service';

@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.page.html',
  styleUrls: ['./prijave.page.scss'],
})
export class PrijavePage implements OnInit, OnDestroy {
  isLoading = false;
  ucitanePrijave: Prijava[];
  private bookingSub: Subscription;
  
  constructor(private prijaveService: PrijaveService) { }
  ngOnDestroy(): void {
    this.bookingSub.unsubscribe();
  }

  ngOnInit() {
    this.bookingSub = this.prijaveService.prijave.subscribe(prijava => {
      this.ucitanePrijave = prijava;
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.prijaveService.fetchPrijave().subscribe(() =>{
      this.isLoading = false;
    });
  }

  otkaziPrijavu(prijavaId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.prijaveService.otkaziPrijavu(prijavaId).subscribe();
  }
}
