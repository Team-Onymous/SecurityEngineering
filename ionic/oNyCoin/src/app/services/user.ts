/**
 * Created by bryan on 15-1-2019.
 */
export class User{

  private _id: number;
  private _walletAddress: string;
  private _firstName: string;
  private _lastName: string;

  constructor(id:number, walletAddress:string, firstName:string, lastName:string) {
    this._id = id;
    this._walletAddress = walletAddress;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get id():number {
    return this._id;
  }

  get walletAddress():string {
    return this._walletAddress;
  }

  get firstName():string {
    return this._firstName;
  }

  get lastName():string {
    return this._lastName;
  }


}
