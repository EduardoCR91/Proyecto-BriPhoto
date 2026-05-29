import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBX79fAnbfQRrlwPVg5Sr4e5qL2is2x7wo',
  authDomain: 'proyectobriphoto.firebaseapp.com',
  projectId: 'proyectobriphoto',
  storageBucket: 'proyectobriphoto.firebasestorage.app',
  messagingSenderId: '635884550744',
  appId: '1:635884550744:web:d2f011f722bf776afce82d',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
