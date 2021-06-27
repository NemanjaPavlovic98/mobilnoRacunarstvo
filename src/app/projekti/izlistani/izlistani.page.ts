import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Projekat } from '../projekti.model';
import { ProjektiService } from '../projekti.service';

@Component({
  selector: 'app-izlistani',
  templateUrl: './izlistani.page.html',
  styleUrls: ['./izlistani.page.scss'],
})
export class IzlistaniPage implements OnInit, OnDestroy {
  izlistaniProjekti: Projekat[];
  isLoading = false; 
  private subskr: Subscription;
  
  constructor(private projektiServise: ProjektiService, private router:Router,
    ) { }

  ngOnDestroy(): void {
    if(this.subskr)
      this.subskr.unsubscribe();
  }

  ngOnInit() {
    this.subskr = this.projektiServise.projekti.subscribe(projekti =>  {
      this.izlistaniProjekti  = projekti;
    }) 
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.projektiServise.fetchProjekti().subscribe( () =>{
      this.isLoading = false; 
    }) ; 
  }

  onEdit(id: string, sliderItem: IonItemSliding){
    sliderItem.close();
    this.router.navigate(['/', 'projekti', 'tabs', 'izlistani', 'izmeni', id]);
    console.log('test');
  }
}
