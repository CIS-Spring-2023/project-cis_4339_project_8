<template>
    <div class="logout-container">
      <h2 class="logout-title">Are you sure you want to log out?</h2>
      <button class="logout-button" @click="logout">Log out</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        this.$root.isAuthenticated = false
        this.$router.push({ name: 'login' })
      }
    }
  }
  </script>
  
  <style>
  .logout-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    font-size: 24px;
  }
  
  .logout-title {
    margin-bottom: 30px;
    text-align: center;
  }
  
  .logout-button {
    background-color: #c8102e;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background-color: #8c0c1b;
  }
  </style>
  