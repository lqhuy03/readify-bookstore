import { auth } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';

export default {
  async register({ email, password, name }) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Cập nhật tên hiển thị
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    return userCredential.user;
  },

  async login({ email, password }) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async logout() {
    await signOut(auth);
  },
  
  getUser() {
    return auth.currentUser;
  }
};