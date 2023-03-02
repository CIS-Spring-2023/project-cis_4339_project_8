<template>
    <div>
      <h2>Services</h2>
      <ul>
        <li v-for="service in services" :key="service.id">
          {{ service.name }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="createService">
        <input v-model="newServiceName" type="text" placeholder="New Service Name" />
        <button type="submit">Create Service</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        services: [
          { id: 1, name: 'Family Support', isActive: true },
          { id: 2, name: 'Adult Education', isActive: true },
          { id: 3, name: 'Youth Services Program', isActive: false },
          { id: 4, name: 'Early Childhood Education', isActive: false },
        ]
      }
    }
  }
  
  </script>
