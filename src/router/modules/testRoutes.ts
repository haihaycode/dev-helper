import { RouteRecordRaw } from "vue-router";
import { dynamicImport } from "@/utils/importUtils";

const components = dynamicImport([
//   "views/pages/folder-errors/NotFoundPage",
//   "views/pages/folder-errors/ServerErrorPage",
]);

const testRoutes: Array<RouteRecordRaw> = [
 
];

export default testRoutes;
