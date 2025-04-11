import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import OverviewPage from "@/views/pages/learn-english-pages/Overview-page.vue";
import ListVocabularyPage from "@/views/pages/learn-english-pages/vocabulary-pages/ListVocabulary-page.vue";
import MobilePageNavigation from "@/views/pages/learn-english-pages/MobilePageNavigation.vue";
import ListNotePage from "@/views/pages/learn-english-pages/note-pages/ListNote-page.vue";
import NoteDetailPage from "@/views/pages/learn-english-pages/note-pages/NoteDetail-page.vue";
import i18n from "@/services/i18n";
import PracticeVocaPage from "@/views/pages/learn-english-pages/vocabulary-pages/practiceVoca-page.vue";

const t = i18n.global.t;
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
              metaTags: [
                {
                  name: "LearnEnglishOverview",
                  content: t("nav.l.english.overview"),
                },
                {
                  property: "og:LearnEnglishOverview",
                  content: t("nav.l.english.overview"),
                },
              ],
            },
            name: "LearnEnglishOverview",
            component: OverviewPage,
          },
          {
            path: "english/tab=list-vocabulary",
            meta: {
              requiresAuth: true,
              tag: "vocabulary", //tag: "vocabulay"
              metaTags: [
                {
                  name: "ListVocabularyPage",
                  content: t("nav.l.english.listVocabulary"),
                },
                {
                  property: "og:ListVocabularyPage",
                  content: t("nav.l.english.listVocabulary"),
                },
              ],
            },
            name: "LearnEnglishListVocabulary",
            component: ListVocabularyPage,
          },
          {
            path: "english/tab=practice-voca",
            meta: {
              requiresAuth: true,
              tag: "vocabulary", //tag: "vocabulay"
              metaTags: [
                {
                  name: "PracticeVocaPage",
                  content: t("nav.l.english.PracticeVocaPage"),
                },
                {
                  property: "og:PracticeVocaPage",
                  content: t("nav.l.english.PracticeVocaPage"),
                },
              ],
            },
            name: "PracticeVocaPage",
            component: PracticeVocaPage,
          },
          {
            path: "english/tab=notes",
            meta: {
              requiresAuth: true,
              tag: "vocabulary", //tag: "vocabulay"
              metaTags: [
                {
                  name: "ListNotePage",
                  content: t("note.title"),
                },
                {
                  property: "og:ListNotePage",
                  content: t("note.title"),
                },
              ],
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
