import Vue from "vue";
import Vuetify from "vuetify/lib";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/dist/vuetify.min.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "typeface-roboto-mono";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
  vuetify: new Vuetify(),
});
