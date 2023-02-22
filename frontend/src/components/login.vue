<template>
  <div class="login-container">
    <h1></h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="loginError" class="error">{{ loginError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: ''
    }
  },
  methods: {
    submitForm() {
      if (this.email === 'admin@example.com' && this.password === 'password') {
        // if the email and password match, redirect to the home page
        window.location.href = '/dashboard'
      } else {
        // if the email and password don't match, set the loginError message
        this.loginError = 'Invalid credentials. Please try again.'
      }
    }
  }
}
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.form-group {
  margin: 10px 0;
}

label {
  display: block;
  font-weight: bold;
  text-align: left;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>