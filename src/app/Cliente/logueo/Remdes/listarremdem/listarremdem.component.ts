import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RemdemService } from 'src/app/Cliente/Services/remdem.service';
import { Remdem } from '../../Interfaces/remdem';

@Component({
  selector: 'app-listarremdem',
  templateUrl: './listarremdem.component.html',
  styleUrls: ['./listarremdem.component.css']
})
export class ListarremdemComponent {
  first = 0;
  rows = 10;
  public ListaRemdem: Remdem[]=[]
  public display: boolean = false;
  public remEdit: Remdem;
  constructor(private readonly router: Router, private readonly remdesservices: RemdemService) {
    this.GetRemdes();
   }


  GetRemdes(){
    this.remdesservices.GetAll().subscribe(
      data=>{
        this.ListaRemdem = data
      });
  }

  Nuevo(){
    this.router.navigateByUrl('RemDes');
  }


  atras(){
    this.router.navigateByUrl('principal');
  }

  Delete(id){
    this.remdesservices.Delete(id).subscribe(
      data=>{
        if (data['code']==1) {
          this.GetRemdes();
        }
      });
  }

  closedModal(){
    this.display = false;
    this.GetRemdes();
  }

  Edit(remdem){
  this.remEdit = remdem;
  this.display = true;
  }

  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.ListaRemdem ? this.first === (this.ListaRemdem.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.ListaRemdem ? this.first === 0 : true;
}


}
