import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase"; // تأكد من مسار firebase
import { v4 as uuidv4 } from "uuid";

export async function trackVisitors() {
  console.log("🚀 بدء تتبع الزوار...");

  if (typeof window === "undefined") {
    console.log("⚠️ يعمل فقط على العميل");
    return;
  }

  let visitorId = localStorage.getItem("visitorId") || uuidv4();
  localStorage.setItem("visitorId", visitorId);

  console.log("🆔 معرف الزائر:", visitorId);

  const visitorRef = doc(db, "analytics", "visitors");

  try {
    const docSnap = await getDoc(visitorRef);

    if (!docSnap.exists()) {
      console.log("🔹 أول زائر، إنشاء سجل جديد...");
      await setDoc(visitorRef, {
        totalVisitors: 1,
        totalVisits: 1,
      });
    } else {
      console.log("📈 تحديث عدد الزيارات...");
      await updateDoc(visitorRef, {
        totalVisits: increment(1),
      });

      const data = docSnap.data();
      if (!data.visitors || !data.visitors.includes(visitorId)) {
        console.log("👤 زائر جديد، تحديث العدد...");
        await updateDoc(visitorRef, {
          totalVisitors: increment(1),
          visitors: [...(data.visitors || []), visitorId],
        });
      }
    }
  } catch (error) {
    console.error("❌ خطأ في تتبع الزائر:", error);
  }
}
