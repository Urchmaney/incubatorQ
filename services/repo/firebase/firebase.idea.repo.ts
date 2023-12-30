import { Firestore, QueryDocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import IAppRepo, { Idea, Learning } from "../IAppRepo";
import firebase_app from "@/firebase.config";


export class FirebaseIdeaRepo implements IAppRepo {
  private appFirestore: Firestore
  readonly IDEA_COLLECTION: string = "ideas"

  readonly FIREBASE_IDEA_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Idea,
    toFirestore: (data: Partial<Idea>) => data
  }

  readonly FIREBASE_LEARNING_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Learning,
    toFirestore: (data: Partial<Learning>) => data
  }

  constructor() {
    this.appFirestore = getFirestore(firebase_app)
  }
  async addIdeaLearning(ideaId: string, learning: string): Promise<void> {
    try {
      const data = { content: learning }
      const collectionRef = collection(this.appFirestore, `${this.IDEA_COLLECTION}/${ideaId}/learnings`).withConverter(this.FIREBASE_LEARNING_CONVERTER)
      await addDoc(collectionRef, data);
    } catch(error) {
      console.log(error)
    }
  }

  async getIdeaLearnings(ideaId: string): Promise<Learning[]> {
    try {
      const collectionRef = collection(this.appFirestore, `${this.IDEA_COLLECTION}/${ideaId}/learnings`).withConverter(this.FIREBASE_LEARNING_CONVERTER);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map(x => ({ id: x.id, content: x.data().content }) as Learning)
    } catch(error) {
      console.log(error)
      return []
    }
    

  }

  async updateIdeaProperties(ideaId: string, properties: Partial<{ description: string, problem: string }>): Promise<void> {
    try {
      setDoc(doc(this.appFirestore, this.IDEA_COLLECTION, ideaId), properties, { merge: true })
    } catch (error) {
      console.log(error);
    }
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
      return {
        idea: {
          id: result.id,
          name: doc?.name || "",
          description: doc?.description || "",
          problem: doc?.problem || ""
        }
      };
    }
    catch (error) {
      console.log(error, "================")
      return { error: ["Error creating Idea"] }
    }
  }

}