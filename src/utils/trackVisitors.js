import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase"; // تأكد من مسار firebase
import { v4 as uuidv4 } from "uuid";

export async function trackVisitors() {

  if (typeof window === "undefined") {
    return;
  }

  let visitorId = localStorage.getItem("visitorId") || uuidv4();
  localStorage.setItem("visitorId", visitorId);


  const visitorRef = doc(db, "analytics", "visitors");

  try {
    const docSnap = await getDoc(visitorRef);

    if (!docSnap.exists()) {
      await setDoc(visitorRef, {
        totalVisitors: 1,
        totalVisits: 1,
      });
    } else {
      await updateDoc(visitorRef, {
        totalVisits: increment(1),
      });

      const data = docSnap.data();
      if (!data.visitors || !data.visitors.includes(visitorId)) {
        await updateDoc(visitorRef, {
          totalVisitors: increment(1),
          visitors: [...(data.visitors || []), visitorId],
        });
      }
    }
  } catch (error) {
    
  }
}
