const storage = require('firebase/storage');
//const { default: firebaseApp } = require('..');
const Media = require('../Models/media.model');
const FirebaseService = require('./firebase.service');

class StorageService {
  
  constructor() {
  
    //const fbApp = firebaseApp
    const fbApp = FirebaseService.firebaseApp;

    const fbStorage = storage.getStorage(fbApp, "reddot-de363.appspot.com");

  }
  
  // Fonction pour enregistrer l'image dans Firebase Cloud Storage
  uploadImageToFirebase(imageData) {  
    
    const imageId = uuid.v4(); // Génère un identifiant unique pour l'image
    
    //const storageRef = firebase.storage().ref();
    const storageRef = storage.ref(fbStorage);
    const imageRef = storageRef.child(`images/${imageId}.jpg`); // Spécifiez le chemin d'enregistrement souhaité pour l'image
    console.log(imageRef);
    
    // Enregistrer l'Uint8Array de l'image dans Firebase Cloud Storage
    imageRef.put(imageData)
    .then((snapshot) => {
      console.log('L\'image a été enregistrée avec succès !');
      storage.getDownloadURL(imageRef).then(res => {
        const newMedia = new Media({
          url: res
        });
        newMedia.save()
          .then((result) => {
            console.log(result);
          }
        )
      });
    })
    .catch((error) => {
      console.error('Erreur lors de l\'enregistrement de l\'image :', error);
    });
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