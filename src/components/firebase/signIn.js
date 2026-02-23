// src/components/firebase/signIn.js

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the import path as necessary

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage);
    throw error;
  }
};

export { signIn };

