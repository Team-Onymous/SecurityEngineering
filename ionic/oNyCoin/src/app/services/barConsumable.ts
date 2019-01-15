/**
 * Created by bryan on 14-1-2019.
 */
export class barConsumable {
  private _name: string;
  private _type: string;
  private _alcoholic: boolean;
  private _cost: number;

  constructor(name:string, type:string, alcoholic:boolean, cost:number) {
    this._name = name;
    this._type = type;
    this._alcoholic = alcoholic;
    this._cost = cost;
  }

  get name():string {
    return this._name;
  }

  get type():string {
    return this._type;
  }

  get alcoholic():boolean {
    return this._alcoholic;
  }

  get cost():number {
    return this._cost;
  }

}