import NavBar from './components/NavBar.vue';
import Home from './components/Home.vue';
import Raking from './components/Raking.vue';
import TopList from './components/Toplist.vue';
import Search from './components/Search.vue';

export default{
    '/navbar':{
        component : NavBar,
        subRoutes:{
            '/home':{
                component: Home
            },
            '/raking':{
                component:Raking
            },
            '/toplist/:id':{
                component:TopList
            },
            '/search':{
                component:Search
            }
        }
    }
}