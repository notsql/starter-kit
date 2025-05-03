import { AuthClientErrorCode, type FirebaseAuthError } from "firebase-admin/auth";
import { ResultAsync } from "neverthrow";

import { getFirebase } from "../loaders/firebase";

const { auth } = getFirebase();

export const generateCustomToken = async (uid: string, claims: object) => {
  return ResultAsync.fromPromise(auth.createCustomToken(uid, claims), e => e);
}

export const verifyIdToken = async (idToken?: string) => {
  if (!idToken) {
    return false
  }

  const res = await ResultAsync.fromPromise(
    auth.verifyIdToken(idToken), error => error as FirebaseAuthError);

  if (res.isErr()) {
    const code = res.error.code;

    switch (code) {
      case AuthClientErrorCode.INTERNAL_ERROR.code:
        throw new Error("[Service.Auth] Firebase Auth Error")
      case AuthClientErrorCode.INSUFFICIENT_PERMISSION.code:
        throw new Error("[Service.Auth] Tweak Settings on GCP");
      default:
        return false;
    }
  }

  return res.value;
}
