/** ユーザー認証情報 */
export type AuthData = { email: string; password: string };

/** ユーザー登録：認証 */
export type SignUpConfirmData = { email: string; code: string };
