import * as admin from "firebase-admin";

const project_id = process.env.PROJECT_ID;
const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");
const client_email = process.env.CLIENT_EMAIL;

if (!project_id || !private_key || !client_email)
  throw Error(
    "Can not see Firebase Environment Variables. Did you load them correctly?"
  );

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: private_key,
      clientEmail: client_email,
      projectId: project_id,
    }),
    databaseURL: "https://ferrisbot-6e0f1.firebaseio.com/",
  });
}

export { admin };
