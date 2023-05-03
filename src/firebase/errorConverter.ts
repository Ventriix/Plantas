// eslint-disable-next-line import/no-extraneous-dependencies
import { AuthErrorCodes } from "@firebase/auth";

export default function getMessageFromCode(error: string): string | undefined {
  let msg: string | undefined;

  if (error) {
    // convert error to string in case it's not
    // eslint-disable-next-line no-param-reassign
    error = error.toString();

    // get firestore error code
    // e.x.: FirebaseError: Firebase: Error (auth/user-not-found).
    const idx: number = error.indexOf("Firebase: Error ("); // returns -1 when not found
    if (idx !== -1) {
      const code: string = error.substring(idx + 17, error.indexOf(")", idx));

      // convert code to a human readable message (some messages can be found here: <https://firebase.google.com/docs/auth/admin/errors?hl=en>)
      switch (code) {
        case AuthErrorCodes.EMAIL_EXISTS: {
          msg = "An account with this email already exists";
          break;
        }
        case AuthErrorCodes.ARGUMENT_ERROR: {
          msg = "Argument error";
          break;
        }
        case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
          msg = "Please logout, re-login, and try again";
          break;
        }
        case AuthErrorCodes.INVALID_PASSWORD: {
          msg = "Incorrect password";
          break;
        }
        case AuthErrorCodes.TOKEN_EXPIRED: {
          msg = "Your token has expired, please logout and re-login";
          break;
        }
        case AuthErrorCodes.USER_CANCELLED: {
          msg = "Login process was stopped by you";
          break;
        }
        case AuthErrorCodes.USER_DELETED: {
          msg = "User does not exist";
          break;
        }
        case AuthErrorCodes.USER_DISABLED: {
          msg = "Your account has been disabled";
          break;
        }
        case AuthErrorCodes.USER_MISMATCH: {
          msg = "Credential given does not correspond to you";
          break;
        }
        case AuthErrorCodes.USER_SIGNED_OUT: {
          msg = "You are signed out, please re-sign in";
          break;
        }
        case AuthErrorCodes.WEAK_PASSWORD: {
          msg =
            "Your password is too weak. It must be at least six characters long";
          break;
        }
        case AuthErrorCodes.INVALID_EMAIL: {
          msg = "The email address is improperly formatted";
          break;
        }
        case AuthErrorCodes.INTERNAL_ERROR: {
          msg = "Internal Error";
          break;
        }
        case AuthErrorCodes.INVALID_API_KEY: {
          msg = "Invalid API key";
          break;
        }
        case AuthErrorCodes.INVALID_APP_CREDENTIAL: {
          msg = "Invalid app credential";
          break;
        }
        case AuthErrorCodes.INVALID_APP_ID: {
          msg = "Invalid app ID";
          break;
        }
        case AuthErrorCodes.INVALID_AUTH: {
          msg = "Invalid user token";
          break;
        }
        case AuthErrorCodes.TIMEOUT: {
          msg = "Authentication timeout";
          break;
        }
        case AuthErrorCodes.UNVERIFIED_EMAIL: {
          msg = "Your email address is not verified, please verify it";
          break;
        }
        case AuthErrorCodes.WEB_STORAGE_UNSUPPORTED: {
          msg =
            "Web storage is unsupported, please update or use a different browser";
          break;
        }
        case AuthErrorCodes.ALREADY_INITIALIZED: {
          msg = "Already initialized";
          break;
        }
        case "auth/too-many-requests": {
          msg =
            "Access to this account has been temporarily disabled due to many failed login attempts, you can immediately restore it by resetting your password or you can try again later";
          break;
        }
        default: {
          msg = `Unknown error >> code = ${code}`;
          break;
        }
      }
    }
  }

  return msg;
}
