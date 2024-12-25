// const firebaseMessages = {
//   auth: {
//     userNotFound: "auth/user-not-found",
//     wrongPassword: "auth/wrong-password",
//     emailAlreadyInUse: "auth/email-already-in-use",
//     weakPassword: "auth/weak-password",
//     operationNotAllowed: "auth/operation-not-allowed",
//   },
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFirebaseMessage(errorCode: string, t: any): string {
  switch (errorCode) {
    case "auth/user-not-found":
      return t("firebase.auth.userNotFound");
    case "auth/wrong-password":
      return t("firebase.auth.wrongPassword");
    case "auth/email-already-in-use":
      return t("firebase.auth.emailAlreadyInUse");
    case "auth/weak-password":
      return t("firebase.auth.weakPassword");
    case "auth/operation-not-allowed":
      return t("firebase.auth.operationNotAllowed");
    default:
      return t("firebase.auth.defaultError");
  }
}
