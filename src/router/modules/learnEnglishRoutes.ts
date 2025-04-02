import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import OverviewPage from "@/views/pages/learn-english-pages/Overview-page.vue";
import ListVocabularyPage from "@/views/pages/learn-english-pages/vocabulary-pages/ListVocabulary-page.vue";
import MobilePageNavigation from "@/views/pages/learn-english-pages/MobilePageNavigation.vue";
import ListNotePage from "@/views/pages/learn-english-pages/note-pages/ListNote-page.vue";
import NoteDetailPage from "@/views/pages/learn-english-pages/note-pages/NoteDetail-page.vue";
const learnEnlishRoutes: Array<RouteRecordRaw> = [
  {
    path: "/l",
    name: "english",
    meta: {
      tag: "LearnEnglish",
    },
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "LearnEnglishOverview",
        children: [
          {
            path: "english",
            meta: {
              requiresAuth: true,
              tag: "LearnEnglishOverview",
            },
            name: "LearnEnglishOverview",
            component: OverviewPage,
          },
          {
            path: "english/tab=list-vocabulary",
            meta: {
              requiresAuth: true,
              tag: "vocabulary", //tag: "vocabulay"
            },
            name: "LearnEnglishListVocabulary",
            component: ListVocabularyPage,
          },
          {
            path: "english/tab=notes",
            meta: {
              requiresAuth: true,
              tag: "vocabulary", //tag: "vocabulay"
            },
            name: "ListNotePage",
            component: ListNotePage,
          },
          {
            path: "english/tab=notes-detail",
            meta: {
              requiresAuth: true,
              tag: "vocabulary", //tag: "vocabulay"
            },
            name: "NoteDetailPage",
            component: NoteDetailPage,
          },
          {
            path: "english/tab=mobile",
            meta: {
              requiresAuth: true,
              tag: "MobilePageNavigation",
            },
            name: "MobileLearnEnglishPageNavigation",
            component: MobilePageNavigation,
          },
        ],
      },
    ],
  },
];

export default learnEnlishRoutes;
