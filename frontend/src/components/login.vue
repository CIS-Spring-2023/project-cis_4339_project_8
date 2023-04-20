<template>
  <!-- Create a login form -->
  <div class="login-container">
    <h1>Dataplatform Login</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <!-- Bind email input value to email state property -->
        <input type="email" id="email" v-model="email" required placeholder="example@example.com">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <!-- Bind password input value to password state property -->
        <input type="password" id="password" v-model="password" required placeholder="Password">
      </div>
      <div class="form-group">
        <label for="user-type">Select User Type:</label>
        <!-- Bind user type select value to userType state property -->
        <select id="user-type" v-model="userType">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    <!-- Show loginError message if it exists -->
    <p v-if="loginError" class="error">{{ loginError }}</p>
    <div class="credentials">
      <span>Login Credentials:</span>
      <hr>
      <p><strong>Viewer:</strong> viewer@example.com / password123</p>
      <p><strong>Editor:</strong> editor@example.com / password123</p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useStore } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()

    const email = store.email
    const password = store.password
    const userType = store.userType
    const loginError = store.loginError

    function submitForm() {
      // authenticate the user
      let authenticated = false;
      if (userType.value === 'viewer') {
        authenticated = email.value === 'viewer@example.com' && password.value === 'password123';
        store.loginType = 'Viewer';
      } else if (userType.value === 'editor') {
        authenticated = email.value === 'editor@example.com' && password.value === 'password123';
        store.loginType = 'Editor';
      }
      if (authenticated) {
        // if the email and password match, redirect to the dashboard page
        store.isAuthenticated = true;
        // assuming router is also managed by Pinia store, you can push to dashboard using:
        // store.$router.push({ name: 'dashboard' })
      } else {
        // if the email and password don't match, set the loginError message
        store.loginError = 'Invalid credentials. Please try again.';
      }
    }

    return {
      email,
      password,
      userType,
      loginError,
      submitForm
    }
  }
})
</script>
<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #444;
}

.form-group {
  margin: 20px 0;
}
</style>