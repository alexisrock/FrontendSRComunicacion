import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from 'src/app/Cliente/Services/correspondencia.service';
import { RemdemService } from 'src/app/Cliente/Services/remdem.service';
import { VwCorrespondenica } from '../../Interfaces/correspondenica';
import { Remdem } from '../../Interfaces/remdem';

import { FileUploadModel } from '../../Interfaces/Archivo';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { catchError, last, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/Cliente/Services/auth.service';

@Component({
  selector: 'app-correspondencia',
  templateUrl: './correspondencia.component.html',
  styleUrls: ['./correspondencia.component.css']
})
export class CorrespondenciaComponent implements OnInit {
  @Input('corresditar') corresditar: VwCorrespondenica;
  @Output('displaychange') displaychange = new EventEmitter();
  public myform: FormGroup;
  public titulo: string;
  selectedCountryAdvanced: Remdem;
  selectedCountryAdvanced2: Remdem;
  public id: number;
  public verEditar: boolean = false;
  public displaybotton: boolean = false;
  listaremi: Remdem[] = []
  listadest: Remdem[] = []
  listrm: Remdem[] = []
  file: File;
  files: FileUploadModel;
  public Link: string;
  public texto: any;
  @Input() text = 'Upload';
  @Input() param = 'file';
  @Input() target = 'https://file.io';
  @Input() accept = 'pdf';
  public listtipocorr = []
  public validation = {
    idRemitente: [
      { type: 'required', message: 'El campo es obligatorio' }
    ],
    idDestinatario: [
      { type: 'required', message: 'El campo es obligatorio' }
    ],

    observacion: [
      { type: 'required', message: 'El campo es obligatorio' }
    ],
    tipoCorrespondencia: [
      { type: 'required', message: 'El campo es obligatorio' }
    ],
  }

  constructor(public router: Router, formbuilder: FormBuilder, private readonly messageService: MessageService,
    private readonly corresservices: CorrespondenciaService, private readonly remdemservices: RemdemService, private readonly _http: HttpClient, private readonly auth: AuthService) {


    this.myform = formbuilder.group({
      idRemitente: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      idDestinatario: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      rutaArchivo: new FormControl('', Validators.compose([

      ])),
      observacion: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      tipoCorrespondencia: new FormControl('1', Validators.compose([
        Validators.required,
      ]))
    });
    this.GetRemDes();


    this.listtipocorr = [
      { name: "seleccione", code: "" },
      { name: "Interna", code: "1" },
      { name: "Externa", code: "2" }
    ]




  }

  ngOnInit(): void {
    this.showDatos();
  }


  showDatos() {
    if (this.corresditar !== undefined) {
      this.listadest.filter(x => x.idremitente == this.corresditar.idDestinatario).forEach(d => {
        this.myform.get('idDestinatario').patchValue(d.nombres);
        this.myform.get('idDestinatario').setValue(d.nombres)
        this.myform.controls['idDestinatario'].setValue(d.nombres)
        this.myform.controls['idDestinatario'].patchValue(d.nombres)



      })




      this.myform.get('idRemitente').setValue(this.corresditar.remitente);
      this.myform.get('idDestinatario').setValue(this.corresditar.idDestinatario);
      this.myform.get('observacion').setValue(this.corresditar.observacion);
      let prefijo = this.corresditar.idCorrespondencia.startsWith('CI') ? "1" : "2";
      this.myform.get('tipoCorrespondencia').setValue(prefijo);



      this.titulo = "Editar Correspondencia";
      this.verEditar = true;
    } else {
      this.displaybotton = true;
      this.titulo = "Correspondencia";
      this.verEditar = false;
      this.LimpiarFormulario();
    }
  }


  GetRemDes() {
    this.remdemservices.GetAll().subscribe(
      data => {
        this.listrm = data

        this.listaremi = this.listrm.filter(x => x.idTipoRemDes == 1)

        this.listadest = this.listrm.filter(x => x.idTipoRemDes == 2)
      });

  }


  async Save() {
    await this.uploadFile();
    if (this.myform.valid) {
      if (this.corresditar != undefined) {
        this.update();

      } else {

        this.add();
      }
    } else {
      this.addSingle('error', 'Faltan datos por completar');
    }

  }

  update() {
    this.corresservices.idcorrespondencia = this.corresditar.idCorrespondencia;
    this.corresservices.correspondencia.idRemitente = this.myform.value.idRemitente.idremitente;
    this.corresservices.correspondencia.idDestinatario = this.myform.value.idDestinatario.idremitente;
    this.corresservices.correspondencia.rutaArchivo = this.Link;
    this.corresservices.correspondencia.observacion = this.myform.value.observacion;
    this.corresservices.correspondencia.tipoCorrespondencia = Number.parseInt(this.myform.value.tipoCorrespondencia);
    let numero = Number.parseInt(this.auth.getIduser())
    console.log(numero);
    this.corresservices.correspondencia.idusuarioactualizacion = numero;
    this.corresservices.update().subscribe(
      data => {
        if (data['code'] == 1) {
          this.displaychange.emit(true);
        } else {

          this.addSingle('error', data['descripcion']);
        }
      }
    );


  }

  add() {

    this.corresservices.correspondencia.idRemitente = this.myform.value.idRemitente.idremitente;
    this.corresservices.correspondencia.idDestinatario = this.myform.value.idDestinatario.idremitente;
    this.corresservices.correspondencia.rutaArchivo = this.Link;
    this.corresservices.correspondencia.observacion = this.myform.value.observacion;
    this.corresservices.correspondencia.tipoCorrespondencia = Number.parseInt(this.myform.value.tipoCorrespondencia);
    console.log("code: " + this.myform.value.tipoCorrespondencia);
    let numero = Number.parseInt(this.auth.getIduser())
    console.log(" user id " + this.auth.getIduser());
    this.corresservices.correspondencia.idusuariocreacion = numero
    this.corresservices.Add().subscribe({
      next: (data) => {
        if (data['code'] == 1) {
          this.LimpiarFormulario();
          this.addSingle('success', data['descripcion']);
        } else {
          this.addSingle('error', data['descripcion']);
        }
      },
      error: (error) => {
        this.addSingle('error', error.message);
      }
    }
    );

  }

  async uploadFile() {

    const fileUpload = document.getElementById('rutaArchivo') as HTMLInputElement;


    if (fileUpload.value != '') {

      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files = {
          data: file,
          state: 'in',
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true
        };


        this.loadFile(this.files);
      }

    } else {

      this.Link = "";
    }

  }

  loadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          this.Link = event.body.link;
          console.log(this.Link)

        }
      }
    );
  }
  atras() {
    this.router.navigateByUrl('ListarCorrespondencia');
  }


  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {//Identifica si hay archivos
      const file = event.target.files[0];
      if (file.type.includes("pdf")) {//Evaluar si es una imagen
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function load() {
          this.image = reader.result; //Asignar al thumbnail
        }.bind(this);
        this.file = file;
      }
    }
  }



  LimpiarFormulario() {
    this.myform.reset();
  }



  addSingle(tipo, mensaje) {
    if (tipo == 'success') {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Usuario creado con exito' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: mensaje });
    }
  }



  filterRem(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let remi of this.listaremi) {
      let country = remi;
      if (country.nombres.toLowerCase().startsWith(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.listaremi = filtered;
  }


  filterdesm(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let dest of this.listadest) {
      let country = dest;
      if (country.nombres.toLowerCase().startsWith(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.listadest = filtered;
  }

}
