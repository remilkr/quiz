import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  categories: any = []

  constructor(
    private firestore: AngularFirestore,private firebase:AngularFireAuth
  ) { }


  loginUser(value){
    return new Promise<any>((resolve, reject) => {
this.firebase.auth.signInWithEmailAndPassword(value.userEmail, value.password)
      //this.firebase.auth.signInWithEmailAndPassword('admin@admin.com', 'adminQuiz')

      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(this.firebase.auth.currentUser){
         this.firebase.auth.signOut()
         .then(() => {
          
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }
   
  userDetails(){
    return this.firebase.auth.currentUser;
  }

  create_Category(record) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('categories').add(record).then(res => {
        resolve(res)
      },
        err => {
          reject(err)
        }
      )
    })
  }

  

  read_Categories() {
    return this.firestore.collection('categories').snapshotChanges();

  }
 
     
// searchUsers(searchValue){
//   return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
//     .where('nameToSearch', '<=', searchValue + '\uf8ff'))
//     .snapshotChanges()
// }

  update_Category(recordID, record) {
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc('categories/' + recordID).update(record).then(res => {
        resolve(res)
      },
        err => {
          reject(err)
        }
      )
    })


  }

  delete_Category(record_id) {
    return new Promise <void>((resolve, reject) => {
    this.firestore.doc('categories/' + record_id).delete().then(res => {
        resolve(res)
      },
        err => {
          reject(err)
        }
      )
    })
  }



    
  create_NewQuestion(record) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('questions').add(record).then(res => {
        resolve(res)
      },
        err => {
          reject(err)
        }
      )
    })

     
}

read_Question(id:any){
  return this.firestore.collection('questions',ref => ref.where('catId', '==', id))
    .snapshotChanges()
  
  }

  update_Question(recordID, record) {
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc('questions/' + recordID).update(record).then(res => {
        resolve(res)
      },
        err => {
          reject(err)
        }
      )
    })


  }

  delete_Question(record_id) {
    return new Promise <void>((resolve, reject) => {
    this.firestore.doc('questions/' + record_id).delete().then(res => {
        resolve(res)
      },
        err => {
          reject(err)
        }
      )
    })
  }

}
