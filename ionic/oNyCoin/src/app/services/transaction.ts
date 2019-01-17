/**
 * Created by bryan on 16-1-2019.
 */
export class transaction {

  private _createdAt: string;
  private _tokenId: string;
  private _token_amount: number;
  private _incoming: boolean;
  private _order: string;

  constructor(createdAt:string, tokenId:string, token_amount:number, incoming:boolean, order:string) {
    this._createdAt = createdAt;
    this._tokenId = tokenId;
    this._token_amount = token_amount;
    this._incoming = incoming;
    this._order = order;
  }

  get createdAt():string {
    return this._createdAt;
  }

  get tokenId():string {
    return this._tokenId;
  }

  get token_amount():number {
    return this._token_amount;
  }

  get incoming():boolean {
    return this._incoming;
  }

  get order():string {
    return this._order;
  }

}