export interface IAnggotas {
  id?: number;
  nama?: string;
}

export class Anggotas implements IAnggotas {
  constructor(public id?: number, public nama?: string) {}
}
