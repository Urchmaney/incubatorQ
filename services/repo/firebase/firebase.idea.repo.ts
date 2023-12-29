import { CollectionReference, Firestore, QueryDocumentSnapshot, addDoc, collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import IAppRepo, { Idea } from "../IAppRepo";
import firebase_app from "@/firebase.config";


export class FirebaseIdeaRepo implements IAppRepo {
  private appFirestore: Firestore
  readonly IDEA_COLLECTION: string = "ideas"

  readonly FIREBASE_IDEA_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) =>  snap.data() as Idea,
    toFirestore: (data: Partial<Idea>) => data
  }

  constructor() {
    this.appFirestore = getFirestore(firebase_app)
  }
  async getUserIdeas(userId: string): Promise<Partial<Idea>[]> {
    const collectionRef = collection(this.appFirestore, this.IDEA_COLLECTION).withConverter(this.FIREBASE_IDEA_CONVERTER);
    const queryRef = query(collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(v => ({ id: v.id, ...v.data() }))
  }

  async createUserIdea(userId: string, idea: string): Promise<{ error?: string[], idea?: Idea }> {
    const data = {
      name: idea,
      userId: userId
    };
    try {
      const collectionRef = collection(this.appFirestore, this.IDEA_COLLECTION).withConverter(this.FIREBASE_IDEA_CONVERTER)
      const result = await addDoc(collectionRef, data);
      const doc = (await getDoc(result)).data();
      return { idea: { id: result.id, name: doc?.name || "", description: doc?.description || "" } };
    }
    catch (error) {
      console.log(error, "================")
      return { error: ["Error creating Idea"] }
    }
  }

}