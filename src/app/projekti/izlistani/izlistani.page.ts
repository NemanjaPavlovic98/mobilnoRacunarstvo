import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Projekat } from '../projekti.model';
import { ProjektiService } from '../projekti.service';

@Component({
  selector: 'app-izlistani',
  templateUrl: './izlistani.page.html',
  styleUrls: ['./izlistani.page.scss'],
})
export class IzlistaniPage implements OnInit {
  izlistaniProjekti: Projekat[];
  
  constructor(private projektiServise: ProjektiService, private router:Router) { }

  ngOnInit() {
    this.izlistaniProjekti = this.projektiServise.projekti;
  }
  onEdit(id: string, sliderItem: IonItemSliding){
    sliderItem.close();
    this.router.navigate(['/', 'projekti', 'tabs', 'izlistani', 'izmeni', id]);
    console.log('test');
  }
}
