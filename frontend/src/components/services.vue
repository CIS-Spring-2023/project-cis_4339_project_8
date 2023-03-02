<template>
  <div>
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Services</h1>
    <table>
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in filteredServices" :key="index">
          <td>{{ service.name }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button @click="editService(index)">Edit</button>
            <button @click="deleteService(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="createService()">Create Service</button>
    <div v-if="editingService !== null">
      <h3>Edit Service</h3>
      <form>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="editedService.name">
        </div>
        <div>
          <label for="status">Status:</label>
          <select id="status" v-model="editedService.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" @click.prevent="saveService()">Save</button>
        <button type="button" @click="cancelEdit()">Cancel</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      services: [
        { name: "Food Aid", status: "active" },
        { name: "Adult Education", status: "active" },
        { name: "Housing Assistance", status: "inactive" }
      ],
      editingService: null,
      editedService: {}
    };
  },
  computed: {
    filteredServices() {
      return this.services.filter((service) => service.status === "active");
    },
  },
  methods: {
    createService() {
      this.editedService = { name: "", status: "active" };
      this.editingService = this.services.length;
    },
    editService(index) {
      this.editingService = index;
      this.editedService = Object.assign({}, this.services[index]);
    },
    deleteService(index) {
      this.services.splice(index, 1);
    },
    saveService() {
      if (this.editingService !== null) {
        Object.assign(this.services[this.editingService], this.editedService);
        this.editingService = null;
      } else {
        this.services.push(this.editedService);
      }
      this.editedService = {};
    },
    cancelEdit() {
      this.editingService = null;
      this.editedService = {};
    }
  }
};
</script>
