import { Component, OnInit } from '@angular/core';
import { UserService } from './../../Service/user.service';
import { User } from './../../Interface/user.interface';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usersInterface: User[] = [];
  term: string;
  filterUsers: User[] = [];
  nameUser: any;

  constructor(private data: UserService) { }

  ngOnInit(): void {
    /*
     * Appeler la méthode getToken
     */
    this.data.getToken();
    console.log(this.data.getToken);
    /*
     *Le set Interval nous permettra  de pouvoir récupérer les données data et les afficher
      sur le template grâce au "usersInterface" qui lui contient tout ce dont on a besoin pour
      l'exercice, soit le nom, prénom ainsi que le wallet;
     */
    const Truc = setInterval(
      () => {
        this.data.getUser();
        this.usersInterface = this.data.users;
        /*
         *Le length est un opérateur de comparaison
         */
        if (this.usersInterface.length !== 0) {
          console.log(this.usersInterface);
          clearInterval(Truc);
        } else {
          console.log('erreur');
        }
      }, 1000
    );

    // tslint:disable-next-line: typedef
    // tslint:disable-next-line: only-arrow-functions
    this.nameUser = this.usersInterface.map(function (e) {
      return e.name;
    });


  }

  ModifWallet = (user: User, operation: string, Value: any, index: number) => {
    this.data.ModifWallet(user, operation, Value)
      .subscribe(() => {
        this.modifWalletUI(user, operation, Value, index);
      });
  }


  modifWalletUI = (user: User, operation: string, Value: any, index: number) => {
    const Val = parseFloat(Value);
    if (operation === 'credit') {
      this.usersInterface[index].wallet += Val;
    } else {
      this.usersInterface[index].wallet -= Val;
    }
  }


  // tslint:disable-next-line: typedef
  filter(event) {
    this.filterUsers = this.usersInterface.filter(
      // tslint:disable-next-line: max-line-length
      user => (user.firstname.toLowerCase().includes(event.target.value.toLowerCase()) || user.name.toLowerCase().includes(event.target.value.toLowerCase())));
    console.log(this.filterUsers);
  }
}
