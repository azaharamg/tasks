<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <label class="form-label" for="#password-repeat"
        >Repeat the password:</label
      >
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        placeholder="Password"
      />
      <p class="error" v-if="diffetentPassword">
        Please make sure your passwords are the same.
      </p>
      <input class="form-submit" type="submit" value="Sign Up" />
    </form>
  </div>
</template>

<script>
import auth from "@/authentication/auth";
export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
    passwordRepeat: "",
    error: false,
    diffetentPassword: false,
  }),
  methods: {
    async register() {
      if (this.password === this.passwordRepeat) {
        this.diffetentPassword = false;
        try {
          await auth.register(this.email, this.password);
          const user = {
            email: this.email,
          };
          auth.setUserLogged(user);
          this.$router.push("/");
        } catch (error) {
          this.error = true;
        }
      } else {
        this.diffetentPassword = true;
        return false;
      }
    },
  },
};
</script>

<style scoped>
@import "../styles/variables.css";

.register {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: var(--dark);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}
.form-label:first-of-type {
  margin-top: 0rem;
}

.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid var(--white);
  color: var(--white);
}
.form-input:focus {
  outline: 0;
  border-color: var(--green);
}
.form-submit {
  background: var(--green);
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 3rem;
  cursor: pointer;
  transition: background 0.2s;
}
.form-submit:hover {
  background: var(--darkGreen);
}

.error {
  margin-top: 3rem;
  text-align: center;
  color: var(--yellow);
}
</style>