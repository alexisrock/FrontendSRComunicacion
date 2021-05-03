import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Cliente/Services/auth.service';
import { CorrespondenciaService } from 'src/app/Cliente/Services/correspondencia.service';
import { environment } from 'src/environments/environment';
import { Correspondenica, VwCorrespondenica } from '../../Interfaces/correspondenica';

@Component({
  selector: 'app-listar-correspondencia',
  templateUrl: './listar-correspondencia.component.html',
  styleUrls: ['./listar-correspondencia.component.css']
})
export class ListarCorrespondenciaComponent implements OnInit {
  first = 0;
  rows = 10;
  public Lista: VwCorrespondenica[]=[]
  public display: boolean = false;
  public displayurl: boolean = false;
  public url: string = "";
  displaybotton: boolean = true;
  public corresEdit: VwCorrespondenica;
  constructor(private router: Router, private corresponservices: CorrespondenciaService, private auth: AuthService) {

    this.GetCorrespondnecia();
    this.showBtnNuevo();
  }

  ngOnInit(): void {
  }

  public rutaurl = environment.urlarchivos;

    GetCorrespondnecia(){
    this.corresponservices.GetAll().subscribe(
      data=>{

        if(this.auth.getIdRol()=="3") {
          this.Lista = data
          var documento = this.auth.getCedula();
          console.log("documento"+documento)
          this.Lista = this.Lista.filter(x => x.documento==documento);


        }else{
          this.Lista = data

        }

      });
    }

    showBtnNuevo(){
      if(this.auth.getIdRol()=="3") {
        this.displaybotton = false;
      }
      else{
        this.displaybotton = true;
      }
    }




    async mostrar(ruta){
      this.url = await ruta;
      window.open( this.url, "Diseño Web", "width=900, height=600")

    }

  Nuevo(){
    this.router.navigateByUrl('Correspondencia');
  }


  Delete(id){
    this.corresponservices.Delete(id).subscribe(
      data=>{
        if (data['code']==1) {
          this.GetCorrespondnecia();
        }
      });
  }

  Edit(remdem){
    this.corresEdit = remdem;
    this.display = true;
    }

    closedModal(){
      this.display = false;
      this.GetCorrespondnecia();
    }

  atras(){
    this.router.navigateByUrl('principal');
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
    return this.Lista ? this.first === (this.Lista.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.Lista ? this.first === 0 : true;
}


}
