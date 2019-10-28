import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IAnggotas } from 'app/shared/model/anggotas.model';
import { IBukus } from 'app/shared/model/bukus.model';

export interface ITransaksis {
  id?: number;
  tanggalPinjam?: Moment;
  tanggalKembali?: Moment;
  user?: IUser;
  anggotas?: IAnggotas;
  bukus?: IBukus;
}

export class Transaksis implements ITransaksis {
  constructor(
    public id?: number,
    public tanggalPinjam?: Moment,
    public tanggalKembali?: Moment,
    public user?: IUser,
    public anggotas?: IAnggotas,
    public bukus?: IBukus
  ) {}
}
