import { Auth, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebase_app from "../../../firebase.config";
import IAuth, { AppUser } from "../IAuth";


export class FirebaseAuth implements IAuth {
  private auth: Auth
  private firebase_user: User | null = null

  get user() : AppUser | null {
    if (this.firebase_user) {
      return { displayName: this.firebase_user?.displayName || "" }
    }
    return null
  }
  constructor() {
    this.auth = getAuth(firebase_app)
  }
  async register(email: string, password: string, full_name: string): Promise<string[]> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password)
      await updateProfile(result.user, { displayName: full_name })
      this.firebase_user = result.user
      return []
    } catch (error) {
      return ["Error registering"]
    }


  }
  async login(email: string, password: string): Promise<string[]> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      this.firebase_user = result.user
      return []
    } catch (e) {
      return [
        "Error Loging in."
      ]
    }
  }

  onAuthChange(cb: () => void): void {
    onAuthStateChanged(this.auth, cb)
  }

  async logout() {
    this.auth.signOut();
    this.firebase_user = null;
  }
}