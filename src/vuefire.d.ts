declare module "vuefire" {
  import { Plugin } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { FirebaseApp } from "firebase/app";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { Firestore } from "firebase/firestore";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { Auth } from "firebase/auth";

  export const VueFire: Plugin;
  export function VueFireAuth(): Plugin;
}
