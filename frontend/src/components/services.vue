<!-- Reference: ChatGPT for some basis of code  -->
<template>
  <div class="container mx-auto px-4">
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center my-10">Services</h1>
    <event-form :active-services="filteredServices"></event-form>
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
import EventForm from "@/components/eventForm.vue";
// import the event form as a prop to show the eventform so that we may pass props between services.vue and eventForm.vue
export default {
  components:{
    EventForm,
  },
  data() {
    return {
      // instantiate an empty array of services so that it can be dynamically populated 
      services: [], 
      editingService: null,
      editedService: {}
    };
  },
  computed: {
    filteredServices() {
      if (this.userType === 'editor') {
        return this.services;
      } else {
        return this.services.filter((service) => service.status === "active");
      }
      // return all services if the user is an editor but only give active services to anybody else (in this case a viewer)
    },
  },
  methods: {
    // CRUD ops for the service creation, edit, soft delete, and an extra save, cancel, and load services so that whenever a user inputs the service and its status, it is saved locally to that user and shows up when switching tabs or when logging in once again
    createService() {
      this.editedService = { name: "", status: "active" };
      this.editingService = this.services.length;
      this.services.push(this.editedService);
      this.saveServices();
    },
    editService(index) {
      this.editingService = index;
      this.editedService = Object.assign({}, this.services[index]);
    },
    deleteService(index) {
      this.services.splice(index, 1);
      this.saveServices();
    },
    saveService() {
      if (this.editingService !== null) {
        Object.assign(this.services[this.editingService], this.editedService);
        this.editingService = null;
      } else {
        this.services.push(this.editedService);
      }
      this.editedService = {};
      this.saveServices();
    },
    cancelEdit() {
      this.editingService = null;
      this.editedService = {};
    },
    saveServices() {
      localStorage.setItem('services', JSON.stringify(this.services));
    },
    loadServices() {
      const services = localStorage.getItem('services');
      if (services) {
        this.services = JSON.parse(services);
      }
    }
  },
  mounted() {
    this.loadServices();
  }
};
</script>