/**
 * Created by bryan on 5-12-2018.
 */



export class UserService {

  public canActivate(url: string): boolean {
    return true;
  }

  isLoggedIn(): boolean {
    return false;
  }

}
