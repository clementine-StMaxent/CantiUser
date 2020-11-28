import { User } from './../Interface/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
 * C'est dans le service quèe nous faisons les requêtes HTTP (POST =(poster) et GET =(recevoir))
 */

const APIlunchtime = 'http://localhost:8080/lunchtime/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   * Nous avons besoin des users ainsi que du token dans le service.
   * Le service est en étrote collaboration avec le UserInterface
   */
  users: any[] = [];
  token: string | null = '';

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  getToken() {
    /*
     * Nous avons besoin du login pour nous connecter à l'API
     */
    const Login = {
      email: 'toto@gmail.com',
      password: 'bonjour'
    };
    // console.log(Login);

    /*
     * Ici on récupère les données grâce à la méthode Post
     * L'observable enploie le .subscribe, celui ci permettra par la suite de renvoyer
     * ce qu'il a pu observer en réponse donc ici le Token
     */
    this.http.post(APIlunchtime + 'login', Login, { observe: 'response' })
      .subscribe((response: any) => {
        this.token = response.headers.get('Authorization');

        /*
         * Je ne récupère pas le token ici, à trouver d'urgence
         */
        console.log(this.token);
      });
  }

  /*
   * La méthode GetUser permettra de récupérer tpus les utilisateurs grâce au "findall"
   * Toujours en observant(.subscribe) la.
   */

  // tslint:disable-next-line: typedef
  getUser() {
    const headers = {
      headers: { Authorization: this.token }
    };
    this.http.get(APIlunchtime + 'user/findall', headers)
      .subscribe((response: User[]) => {
        this.users = response;
      });
  }

  // tslint:disable-next-line: typedef
  creditWallet(user: User, operation: string, Value: any) {
    const credit = 'http://localhost:8080/lunchtime/user/debit' + user.id + '?amount=' + Value;
    console.log(credit);
    if (Value){
      console.log(Value);
    }
  }
  ModifWallet(user: User, operation: string, Value: any) {
    const credit = 'http://localhost:8080/lunchtime/user/' + operation;
    const options = {
      headers: { Authorization: this.token }
    };
    const url = credit + '/' + user.id + '?amount=' + Value;
    return this.http.post(url, options, { headers: options.headers });
  }
}
