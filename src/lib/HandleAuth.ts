import { GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithRedirect } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function googleSignIn() {
    try {
        // authenticate
        const provider = new GoogleAuthProvider()
        await signInWithRedirect(auth, provider)

        // add to database if user doesn't already exist
        // ! potential issue in production with 'any' type
        onAuthStateChanged(auth, async (user:any) => {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            })
        })

        // return inf
        return {status: "200 SUCCESS", userInfo: auth.currentUser}

    } catch(e) {
        return {status: "400 ERROR", errorMsg: e}
    }
}

export async function anonymousSignIn() {
    try {
        // authenticate
        await signInAnonymously(auth)

        // add to database
        // ! potential issue in production with 'any' type
        onAuthStateChanged(auth, async (user:any) => {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: "Anonymous User",
                photoURL: "/favicon.ico",
            })
        })

        // return info
        return {status: "200 SUCCESS", userInfo: auth.currentUser}

    } catch(e) {
        return {status: "400 ERROR", errorMsg: e}
    }
}