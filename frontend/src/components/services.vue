<!-- Reference: ChatGPT for some basis of code  -->
<template>
  <div class="container mx-auto px-4">
        <event-form :active-services="filteredServices"></event-form>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center my-10">Services</h1>
    <table class="w-full">
      <thead>
        <tr class="text-left font-bold">
          <th class="py-2">Service Name</th>
          <th class="py-2">Status</th>
          <th class="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- For every service in filtered services that filters by status of active, give the name and the status of the service -->
        <tr v-for="(service, index) in filteredServices" :key="index" class="border-b border-gray-400">
          <td class="py-2">{{ service.name }}</td>
          <td class="py-2">{{ service.status }}</td>
          <td class="py-2">
            <button 
              class="bg-red-700 text-white rounded px-4 py-2 mr-2"
              type="submit"
              @click="editService(index)">
              Edit
            </button>
            <button
              class="border border-red-700 bg-white text-red-700 rounded px-4 py-2"
              type="submit"
              @click="deleteService(index)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="my-4" v-if="!editingService">
      <button 
        class="bg-green-700 text-white rounded px-4 py-2"
        type="submit"
        @click="createService()">
        Create Service
      </button>
    </div>

    <div v-if="editingService !== null">
      <h3 class="font-bold text-lg mb-2">Edit Service</h3>
      <form>
        <div class="my-2">
          <label for="name" class="block font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            v-model="editedService.name"
            class="block w-full border border-gray-400 rounded px-4 py-2">
        </div>
        <div class="my-2">
          <label for="status" class="block font-bold mb-2">Status:</label>
          <select
            id="status"
            v-model="editedService.status"
            class="block w-full border border-gray-400 rounded px-4 py-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          class="bg-green-700 text-white rounded px-4 py-2 mr-2"
          @click.prevent="saveService()">
          Save
        </button>
        <button
          type="button"
          class="border border-red-700 bg-white text-red-700 rounded px-4 py-2"
          @click="cancelEdit()">
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventForm from "@/components/eventForm.vue";
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  components:{
    EventForm,
  },
  data() {
    return {
      services: [],
      editingService: null,
      editedService: {},
    };
  },
  computed: {
    filteredServices() {
      if (this.userType === 'editor') {
        return this.services;
      } else {
        return this.services.filter((service) => service.status === "active");
      }
    },
  },
  methods: {
    createService() {
      this.editedService = { name: "", status: "active" };
      this.editingService = this.services.length;
      this.services.push(this.editedService);
    },
    editService(index) {
      this.editingService = index;
      this.editedService = Object.assign({}, this.services[index]);
    },
    deleteService(index) {
      this.services.splice(index, 1);
    },
    async saveService() {
      try {
          await axios.put(`${apiURL}/service/${this.editedService._id}`, this.editedService);
          this.editingService = null;
          this.editedService = {};
          } 
          catch (error) {
            console.error(error);
          }
    },
    cancelEdit() {
    this.editingService = null;
    this.editedService = {};
    },
    async saveServices() {
      try {
        const response = await axios.post(`${apiURL}/service`, this.services);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async loadServices() {
      try {
        const response = await axios.get(`${apiURL}/service`);
        this.services = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  async created() {
    await this.loadServices();
  },
};
</script>
