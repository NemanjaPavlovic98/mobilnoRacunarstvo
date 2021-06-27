import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Projekat } from '../projekti.model';
import { ProjektiService } from '../projekti.service';

@Component({
  selector: 'app-istaknuto',
  templateUrl: './istaknuto.page.html',
  styleUrls: ['./istaknuto.page.scss'],
})
export class IstaknutoPage implements OnInit, OnDestroy {
  private subskr: Subscription;
  ucitaniProjekti: Projekat[];
  isLoading =  false;

  constructor(private projektiServise: ProjektiService) { }

  ngOnInit() {
    this.subskr = this.projektiServise.projekti.subscribe(projekti =>  {
      this.ucitaniProjekti  = projekti;
    }) 
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.projektiServise.fetchProjekti().subscribe( () =>{
      this.isLoading = false; 
    }) ; 
  }

  ngOnDestroy(): void {
    if(this.subskr)
      this.subskr.unsubscribe();
  }

}
