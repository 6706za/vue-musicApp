import Vue from 'vue';
import App from "./App.vue";
import VueRouter from 'vue-router';
import RouterConfig from './router.config.js';
import VueResource from 'vue-resource';
import VueAwesomeSwiper from 'vue-awesome-swiper';


Vue.use(VueRouter);
Vue.use(VueResource); //使用ajax/resource
Vue.use(VueAwesomeSwiper);

var router = new VueRouter();

router.map(RouterConfig);

router.redirect({
    '/':'/navbar/home'
});


router.start(App,'#app');