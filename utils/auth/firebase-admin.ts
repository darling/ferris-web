import * as admin from "firebase-admin";
import serviceAccount from "./firebase.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: "https://ferrisbot-6e0f1.firebaseio.com/",
  });
}

export { admin };
