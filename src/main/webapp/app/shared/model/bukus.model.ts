export interface IBukus {
  id?: number;
  nama?: string;
  pengarang?: string;
}

export class Bukus implements IBukus {
  constructor(public id?: number, public nama?: string, public pengarang?: string) {}
}
