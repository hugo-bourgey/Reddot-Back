const storage = require('firebase/storage');
//const { default: firebaseApp } = require('..');
const Media = require('../Models/media.model');
const FirebaseService = require('./firebase.service');
const uuid = require('uuid');

class StorageService {
  fbStorage;
  
  constructor() {
  
    //const fbApp = firebaseApp
    const fbApp = FirebaseService.firebaseApp;

    this.fbStorage = storage.getStorage(fbApp, "reddot-de363.appspot.com");
    
  }
  
  // Fonction pour enregistrer l'image dans Firebase Cloud Storage
  async uploadImageToFirebase(imageData) {  
    
    const imageId = uuid.v4(); // Génère un identifiant unique pour l'image
    
    //const storageRef = firebase.storage().ref();
    const storageRef = storage.ref(this.fbStorage);
    const imageRef = storage.ref(storageRef, 'images/' + imageId + '.jpg');
    //const imageRef = storageRef.child(`images/${imageId}.jpg`); // Spécifiez le chemin d'enregistrement souhaité pour l'image
    
    console.log(imageRef);
    
    // Enregistrer l'Uint8Array de l'image dans Firebase Cloud Storage
    //imageRef.put(imageData)
    
    //const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);

    var imgUrl;

    await storage.uploadBytes(imageRef, imageData)
    .then(async (snapshot) => {
      console.log('L\'image a été enregistrée avec succès !');
      await storage.getDownloadURL(imageRef).then(res => {
        /*const newMedia = new Media({
          url: res
        });
        newMedia.save()
          .then((result) => {
            console.log("Media saved in Firebase: " + result);
            return res;
          }
        )*/
        console.log("Media saved in Firebase: " + res);

        imgUrl = res;
      });
    })
    .catch((error) => {
      console.error('Erreur lors de l\'enregistrement de l\'image :', error);
    });

    return imgUrl;
  }

}

module.exports = StorageService;





// const refImages = storage.ref(fbStorage, 'images');

// storage.listAll(refImages) .then((res) => {
//   res.items.forEach((itemRef) => {
//     console.log(itemRef.name);
//   });
// }).catch((error) => {
//   console.log("Fuck it we ball");
// });

// const refSard = storage.ref(fbStorage, 'images/sard.png');

// storage.getDownloadURL(refSard).then(res => {
//   console.log(res);
// });