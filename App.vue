<script setup>
import Sidebar from './components/Sidebar.vue'
import TopMenu from './components/TopMenu.vue'
import Footer from './components/Footer.vue'
import ClubsPage from './components/ClubsPage.vue'
import SamplePage from './components/SamplePage.vue'
import AboutUs from './components/AboutUs.vue'
import FoodAndBeverage from './components/FoodAndBeverage.vue'
import router from './router/routes.js'
import Moffetts from './components/Moffetts.vue'
import Smokeys from './components/Smokeys.vue'
import Sult from './components/Sult.vue'
import Friars from './components/Friars.vue'
import Registration from './components/Registration.vue'
import SignIn from './components/SignIn.vue'
import Wall from './components/Wall.vue'
import Badminton from './components/Badminton.vue'
import Basketball from './components/Basketball.vue'
import Athletics from './components/Athletics.vue'
import SportsBall from './components/SportsBall.vue'
import ScienceBall from './components/ScienceBall.vue'
import EngBall from './components/EngBall.vue'
import Profile from './components/Profile.vue'
</script>

<template>
  <div id="app">
    <Sidebar />
    <TopMenu />

    <router-view />
    <Footer />
  </div>
</template>

<style scoped>

</style>
./router/routes