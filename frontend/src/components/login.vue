// Reference: ChatGPT for some basis of code 
<template>
    <!-- Create a login form -->
  <div class="login-container" >
    <h1>Dataplatform Login</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <!-- Bind email input value to email data property -->
        <input type="email" id="email" v-model="email" required placeholder="example@example.com">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <!-- Bind password input value to password data property -->
        <input type="password" id="password" v-model="password" required placeholder="Password">
      </div>
      <div class="form-group">
        <label for="user-type">Select User Type:</label>
        <!-- Bind user type select value to userType data property -->
        <select id="user-type" v-model="userType">
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
      <p><strong>Editor:</strong> editor@example.com / password123</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      userType: 'editor',
      loginError: ''
    }
  },
  methods: {
    submitForm() {
      // authenticate the user
      let authenticated = false;
      if (this.userType === 'viewer') {
        authenticated = this.email === 'viewer@example.com' && this.password === 'password123';
        this.$root.loginType = 'Viewer';
      } else if (this.userType === 'editor') {
        authenticated = this.email === 'editor@example.com' && this.password === 'password123';
        this.$root.loginType = 'Editor';
      }
      if (authenticated) {
        // if the email and password match, redirect to the dashboard page
        this.$router.push({ name: 'dashboard' });
        this.$root.isAuthenticated = true;
      } else {
        // if the email and password don't match, set the loginError message
        this.loginError = 'Invalid credentials. Please try again.';
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

label {
  display: block;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  color: #444;
}

input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  margin-bottom: 10px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  width: 100%;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
.credentials {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f7f7;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #444;
}
</style>