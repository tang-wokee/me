// src/router.js
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import RouterView from "./views/RouterView.vue";
import { i18n } from "./main.js";

Vue.use(Router);
export default new Router({
  mode: "history",
      base: process.env.BASE_URL,
      routes: [
         {
           path: "/:lang",
           component: RouterView,
           beforeEnter(to, from, next) {
             const lang = to.params.lang;
             if (!["en", "zh-Hant", "zh-Hans"].includes(lang)) return next("en");
             if (i18n.locale !== lang) {
               i18n.locale = lang;
             }
             return next();
         },

         children: [
             {
               path: "home",
               name: "home",
               component: Home
             },
             {
               path: "about",
               name: "about",
               // route level code-splitting
               // this generates a separate chunk (about.[hash].js) for this route
               // which is lazy-loaded when the route is visited.
               ////component: () =>
               ////  import(/* webpackChunkName: "about" */ "./views/About.vue")
             }
         ]
       },

       {
         path: "*",
         redirect: "/en"
         }
       ]
     });
