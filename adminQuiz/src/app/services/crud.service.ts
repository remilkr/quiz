import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  categories: any = []

  constructor(
    private firestore: AngularFirestore
  ) { }


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
  
  read_Question(id:any) {
return this.firestore.collection('questions').doc('catId').set(id)
}
read_Questions(id:any){
  console.log('my id',id)
  return this.firestore.collection('questions',ref => ref.where('catId', '==', id))
   // .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    .snapshotChanges()
}

     
// searchUsers(searchValue){
//   return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
//     .where('nameToSearch', '<=', searchValue + '\uf8ff'))
//     .snapshotChanges()
// }

  update_Question(recordID, record) {
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

  delete_Question(record_id) {
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

    //return this.firestore.collection('questions').doc('').collection('').add(record);
    
  }
  dummy(){
    return new Promise <void>((resolve, reject) => {
     
        }
      )
  
  }
}