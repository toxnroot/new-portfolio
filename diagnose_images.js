
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function checkProjects() {
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, 'projects'));
        console.log("Found", querySnapshot.size, "projects");
        querySnapshot.forEach((doc) => {
            console.log(`ID: ${doc.id}, Image URL: ${doc.data().image}`);
        });
    } catch (error) {
        console.error("Error fetching projects:", error.message);
    }
}

checkProjects();
