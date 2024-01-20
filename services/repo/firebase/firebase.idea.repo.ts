import { Firestore, QueryDocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where, updateDoc, deleteDoc, arrayUnion, or, arrayRemove } from "firebase/firestore";
import IAppRepo, { Assumption, Idea, IdeaStep, Invitation, Journey, Learning, Member, PendingMember } from "../IAppRepo";
import firebase_app from "@/firebase.config";


export class FirebaseIdeaRepo implements IAppRepo {
  private appFirestore: Firestore
  readonly IDEA_COLLECTION: string = "ideas"
  readonly JOURNEY_COLLECTION: string = "journeys"
  readonly INVITATION_COLLECTION: string = "invitations"

  readonly FIREBASE_IDEA_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Idea,
    toFirestore: (data: Partial<Idea>) => data
  }

  readonly FIREBASE_LEARNING_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Learning,
    toFirestore: (data: Partial<Learning>) => data
  }

  readonly FIREBASE_ASSUMPTION_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Assumption,
    toFirestore: (data: Partial<Assumption>) => data
  }

  readonly FIREBASE_JOURNEY_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Journey,
    toFirestore: (data: Partial<Journey>) => data
  }

  readonly FIREBASE_INVITATION_CONVERTER = {
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Invitation,
    toFirestore: (data: Partial<Invitation>) => data
  }


  constructor() {
    this.appFirestore = getFirestore(firebase_app)
  }

  async removePendingMemberFromIdea(ideaId: string, member: PendingMember): Promise<void> {
    try {
      await updateDoc(doc(this.appFirestore, this.IDEA_COLLECTION, ideaId), {
        pendingMembers: arrayRemove(member)
      });
      await deleteDoc(doc(this.appFirestore, this.INVITATION_COLLECTION, member.inviteId ))
    } catch(e) {
      console.log("error removing pending")
      return
    }
  }


  async removeMemberFromIdea(ideaId: string, member: Member): Promise<void> {
    try {
      await updateDoc(doc(this.appFirestore, this.IDEA_COLLECTION, ideaId), {
        members: arrayRemove(member),
        membersIds: arrayRemove(member.id)
      })
    } catch(e) {
      return
    }
  }

  async getUserInvitations(email: string): Promise<Invitation[]> {
    const collectionRef = collection(this.appFirestore, this.INVITATION_COLLECTION).withConverter(this.FIREBASE_INVITATION_CONVERTER);
    const queryRef = query(collectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(v => ({ id: v.id, ...v.data() } as Invitation))
  }


  async createInvitation(email: string, idea: string, ideaId: string, userId: string): Promise<Partial<{ success: boolean; error: string; }>> {
    try {
      const data = { email, idea, ideaId, userId }
      const collectionRef = collection(this.appFirestore, this.INVITATION_COLLECTION).withConverter(this.FIREBASE_INVITATION_CONVERTER)
      const result = await addDoc(collectionRef, data);
      await updateDoc(doc(this.appFirestore, this.IDEA_COLLECTION, ideaId), {
        pendingMembers: arrayUnion({ inviteId: result.id,  email })
      })
      return { success: true }
    }
    catch(e) {
      return { error: "Error creating Invitation." }
    }
  }


  async acceptInvitation(invitation: Invitation, user: { userId: string, email: string, username: string }): Promise<void> {
    try {
      if (invitation.email.toLowerCase() !== user.email.toLowerCase()) return;


      await updateDoc(doc(this.appFirestore, this.IDEA_COLLECTION, invitation.ideaId), {
        membersIds: arrayUnion(user.userId),
        members: arrayUnion({ id: user.userId, owner: false, email: user.email, name: user.username }),
        pendingMembers: arrayRemove({ inviteId: invitation.id, email: invitation.email })
      })

      await this.cancelInvitation(invitation, user)
    } catch (e) {
      return
    }
  }


  async cancelInvitation(invitation: Invitation, user: { userId: string, email: string, username: string }): Promise<void> {
    try {
      await deleteDoc(doc(this.appFirestore, this.INVITATION_COLLECTION, invitation.id))
      await updateDoc(doc(this.appFirestore, this.IDEA_COLLECTION, invitation.ideaId), {
        pendingMembers: arrayRemove(user.email)
      })
    }
    catch(e){
      return
    }
  }

  async updateUserJourney(userId: string, journeyId: string, journey: Partial<Journey>): Promise<Partial<{ journeyId: string; error: string; }>> {
    try {
      updateDoc(doc(this.appFirestore, this.JOURNEY_COLLECTION, journeyId), journey)
      return { journeyId: journeyId }
    }
    catch (err) {
      return { error: "Error " }
    }

  }

  async getJourneys(): Promise<Journey[]> {
    try {
      const collectionRef = collection(this.appFirestore, this.JOURNEY_COLLECTION).withConverter(this.FIREBASE_JOURNEY_CONVERTER);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map(x => ({ id: x.id, ...x.data() }) as Journey)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async createUserJourney(userId: string, journey: Partial<Journey>): Promise<Partial<{ journeyId: string, error: string }>> {
    try {
      const data = { userId, ...journey }
      const collectionRef = collection(this.appFirestore, this.JOURNEY_COLLECTION).withConverter(this.FIREBASE_JOURNEY_CONVERTER)
      const result = await addDoc(collectionRef, data);
      return { journeyId: result.id }
    } catch (error) {
      console.log(error)
      return { error: "Error adding assumptions" }
    }
  }


  async addIdeaAssumption(ideaId: string, assumption: string): Promise<Partial<{ id: string, error: string }>> {
    try {
      const data = { content: assumption }
      const collectionRef = collection(this.appFirestore, `${this.IDEA_COLLECTION}/${ideaId}/assumptions`).withConverter(this.FIREBASE_ASSUMPTION_CONVERTER)
      const result = await addDoc(collectionRef, data);
      return { id: result.id }
    } catch (error) {
      console.log(error)
      return { error: "Error adding assumptions" }
    }
  }
  async getIdeaAssumptions(ideaId: string): Promise<Assumption[]> {
    try {
      const collectionRef = collection(this.appFirestore, `${this.IDEA_COLLECTION}/${ideaId}/assumptions`).withConverter(this.FIREBASE_ASSUMPTION_CONVERTER);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map(x => ({ id: x.id, content: x.data().content }) as Assumption)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async addIdeaLearning(ideaId: string, learning: string): Promise<void> {
    try {
      const data = { content: learning }
      const collectionRef = collection(this.appFirestore, `${this.IDEA_COLLECTION}/${ideaId}/learnings`).withConverter(this.FIREBASE_LEARNING_CONVERTER)
      await addDoc(collectionRef, data);
    } catch (error) {
      console.log(error)
    }
  }

  async getIdeaLearnings(ideaId: string): Promise<Learning[]> {
    try {
      const collectionRef = collection(this.appFirestore, `${this.IDEA_COLLECTION}/${ideaId}/learnings`).withConverter(this.FIREBASE_LEARNING_CONVERTER);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map(x => ({ id: x.id, content: x.data().content }) as Learning)
    } catch (error) {
      console.log(error)
      return []
    }


  }

  async updateIdeaProperties(ideaId: string, properties: Partial<{ description: string, problem: string, steps: IdeaStep[] }>): Promise<void> {
    try {
      setDoc(doc(this.appFirestore, this.IDEA_COLLECTION, ideaId), properties, { merge: true })
    } catch (error) {
      console.log(error);
    }
  }

  async getUserIdeas(userId: string): Promise<Partial<Idea>[]> {
    const collectionRef = collection(this.appFirestore, this.IDEA_COLLECTION).withConverter(this.FIREBASE_IDEA_CONVERTER);
    const queryRef = query(collectionRef, or(where("userId", "==", userId), where("membersIds", "array-contains", userId)));
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(v => ({ id: v.id, ...v.data() }))
  }

  async getUserOwnedIdeas(userId: string): Promise<Partial<Idea>[]> {
    const collectionRef = collection(this.appFirestore, this.IDEA_COLLECTION).withConverter(this.FIREBASE_IDEA_CONVERTER);
    const queryRef = query(collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(v => ({ id: v.id, ...v.data() }))
  }

  async createUserIdea(userId: string, idea: string, email: string, name: string): Promise<{ error?: string[], idea?: Idea }> {
    const data = {
      name: idea,
      userId: userId,
      membersIds: [userId],
      members: [
        { id: userId, owner: true, email, name }
      ]
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
          problem: doc?.problem || "",
          members: doc?.members || [],
          membersIds: doc?.membersIds || [],
          pendingMembers: doc?.pendingMembers || []
        }
      };
    }
    catch (error) {
      console.log(error, "================")
      return { error: ["Error creating Idea"] }
    }
  }

}