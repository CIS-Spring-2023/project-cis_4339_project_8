<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',
  data() {
    return {
      orgName: 'CIS4339 Spring 2023 Project',
      isAuthenticated: false,
      loginType: '',
      zip: []
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name
    })
    axios.get(`${apiURL}/client/zip`).then((res) => {
      this.zipCodes = res.data
    })
  }
}
</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
  <ul class="flex flex-col gap-4">
    <li v-if="!isAuthenticated">
      <router-link to="/">
        <span style="position: relative; top: 6px" class="material-icons">login</span>
        Login
      </router-link>
    </li>
    <li v-if="!isAuthenticated">
      <router-link to="/dashboard">
        <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
        Dashboard
      </router-link>
    </li>
    <li v-if="isAuthenticated">
      <router-link to="/dashboard">
        <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
        Dashboard
      </router-link>
    </li>
    <li v-if="isAuthenticated && loginType === 'Editor'">
      <router-link to="/intakeform">
        <span style="position: relative; top: 6px" class="material-icons">people</span>
        Client Intake Form
      </router-link>
    </li>
    <li v-if="!isAuthenticated || (loginType === 'Editor')">
      <router-link to="/services">
        <span style="position: relative; top: 6px" class="material-icons">event</span>
        Services/Event
      </router-link>
    </li>
    <li v-if="!isAuthenticated || (loginType === 'Editor')">
      <router-link to="/findclient">
        <span style="position: relative; top: 6px" class="material-icons">search</span>
        Find Client
      </router-link>
    </li>
    <li v-if="!isAuthenticated || (loginType === 'Editor')">
      <router-link to="/findevents">
        <span style="position: relative; top: 6px" class="material-icons">search</span>
        Find Event
      </router-link>
    </li>
    <li v-if="isAuthenticated">
      <router-link to="/logout">
        <span style="position: relative; top: 6px" class="material-icons">logout</span>
        Logout
      </router-link>
    </li>
  </ul>
</nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>