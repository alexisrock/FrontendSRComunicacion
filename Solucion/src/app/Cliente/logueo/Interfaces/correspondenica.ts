export interface VwCorrespondenica {
  idCorrespondencia: string;
  idRemitente: number;
  idDestinatario: number;
  rutaArchivo: string;
  observacion: string;
  fechaCreacion: Date;
  remitente: string;
  destinatario: string;
  documento: string;
}


export interface Correspondenica {
  idCorrespondencia?: string;
  idRemitente: number;
  idDestinatario: number;
  rutaArchivo: string;
  observacion: string;
  idusuariocreacion?: number;
  fechaCreacion?: Date;
  idusuarioactualizacion?: number;
  fechaactualizacion?: Date;
  tipoCorrespondencia: number;


}
