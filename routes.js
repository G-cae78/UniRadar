import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import AboutUs from '@/components/AboutUs.vue';
import FoodAndBeverage from '@/components/FoodAndBeverage.vue';
import SamplePage from '@/components/SamplePage.vue';
import ClubsPage from '@/components/ClubsPage.vue';
import Bialann from '@/components/Bialann.vue';
import Zinc from '@/components/Zinc.vue';
import Gaeilge from '@/components/Gaeilge.vue';
import Friars from '@/components/Friars.vue';
import CloudCafe from '@/components/CloudCafe.vue';
import Sult from '@/components/Sult.vue';
import Smokeys from '@/components/Smokeys.vue';
import Moffetts from '@/components/Moffetts.vue';
import Registration from '@/components/Registration.vue';
import Wall from '@/components/Wall.vue';
import SignIn from '@/components/SignIn.vue';
import Events from '@/components/Events.vue';
import EngBall from '@/components/EngBall.vue';
import ScienceBall from '@/components/ScienceBall.vue';
import SportsBall from '@/components/SportsBall.vue';
import Athletics from '@/components/Athletics.vue';
import Badminton from '@/components/Badminton.vue';
import Basketball from '@/components/Basketball.vue';
import Profile from '@/components/Profile.vue';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
const routes = [
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
  
    {
      path: '/food-and-beverage',
      name: 'FoodAndBeverage',
      component: FoodAndBeverage,
      meta:{ requiresAuth:true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta:{ requiresAuth:true },
    },

    // { For testing, no longer needed
    //   path: '/sample-page',
    //   name: 'SamplePage',
    //   component: SamplePage
    // },
    {
        path: '/clubs',
        name: 'ClubsPage',
        component: ClubsPage,
        meta:{ requiresAuth:true },
      },
      {
        path: '/Clubs/Athletics',
        name: 'Athletics',
        component: Athletics,
        meta:{ requiresAuth:true },
      },
      {
        path: '/Clubs/Badminton',
        name: 'Badminton',
        component: Badminton,
        meta:{ requiresAuth:true },
      },
      {
        path: '/Clubs/Basketball',
        name: 'Basketball',
        component: Basketball,
        meta:{ requiresAuth:true },
      },
      {
        path: '/food-spot/:AnBhialann',
        name: 'AnBhialann',
        component: Bialann,
        meta:{ requiresAuth:true },
        
      },  
      {
        path: '/food-spot/:ZincCafé',
        name: 'ZincCafé',
        component: Zinc,
        meta:{ requiresAuth:true },
      }, 
      {
        path: '/food-spot/:Caifé na Gaeilge',
        name: 'Caifé na Gaeilge',
        component: Gaeilge,
        meta:{ requiresAuth:true },
      }, 
      {
        path: '/food-spot/:Friars Café & Restaurant',
        name: 'Friars Café & Restaurant',
        component: Friars,
        meta:{ requiresAuth:true },
      },
      {
        path: '/food-spot/Cloud Café',
        name: 'Cloud Café',
        component: CloudCafe,
        meta:{ requiresAuth:true },
      },
      {
        path: '/food-spot/Sult',
        name: 'Sult',
        component: Sult,
        meta:{ requiresAuth:true },
      },
      {
        path: '/food-spot/Smokeys Cafe',
        name: 'Smokeys Cafe',
        component: Smokeys,
        meta:{ requiresAuth:true },
      },
      {
        path: '/food-spot/Moffetts',
        name: 'Moffetts',
        component: Moffetts,
        meta:{ requiresAuth:true },
      },
      {
        path: '/food-spot/The Wall Café',
        name: 'The Wall Café',
        component: Wall,
        meta:{ requiresAuth:true },
      },
      {
        path: '/registration',
        name: 'Registration',
        component: Registration
      },
      {
        path: '/',
        name: 'SignIn',
        component: SignIn
      },
      {
        path: '/Events',
        name: 'Events',
        component: Events,
        meta:{ requiresAuth:true },
      },
  
      {
        path: '/Events/Science Ball',
        name: 'Science Ball',
        component: ScienceBall,
        meta:{ requiresAuth:true },
      },
  
      {
        path: '/Events/Sports Ball',
        name: 'Sports Ball',
        component: SportsBall,
        meta:{ requiresAuth:true },
      },
  
      {
        path: '/Events/Engineering and Nursing Ball',
        name: 'Engineering and Nursing Ball',
        component: EngBall,
        meta:{ requiresAuth:true },
      },


  ];
//Registration
  
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser=() =>{
         return new Promise((resolve, reject)=>{
          const removeListener= onAuthStateChanged(
            getAuth(),
            (user)=>{
              removeListener();
              resolve(user);
            }
          )
         })
}
router.beforeEach(async (to,from,next)=>{
  if(to.matched.some((record)=> record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    }
    else{
      alert("you dont have access!");
      next({ name: 'SignIn'});
    }
  }
  else{
    next();
  }
});

export default routes