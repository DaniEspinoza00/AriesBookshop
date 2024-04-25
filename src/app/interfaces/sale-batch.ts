export interface SaleBatch {
    id?: number;
    date: string;
    idBook: number;
    idUser: number;
    quantity: number;
    subtotal: number;
    batchId:number;
  }