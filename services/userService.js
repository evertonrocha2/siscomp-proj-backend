const admin = require('../config/firebase-admin');

exports.createUser = async (email, password, uid, isAdmin) => {
  const userRecord = await admin.auth().createUser({
    uid: uid,
    email: email,
    password: password,
  });

  await admin.firestore().collection('usuarios').doc(uid).set({
    email: email,
    isAdmin: isAdmin,
    blocked: false,
  });

  if (isAdmin) {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
  }

  return userRecord;
};

exports.updateAdminStatus = async (uid, isAdmin) => {
  await admin.firestore().collection('usuarios').doc(uid).update({
    isAdmin: isAdmin
  });

  await admin.auth().setCustomUserClaims(uid, { admin: isAdmin });
};