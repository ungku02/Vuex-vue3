<template>
    <div class="container vh-100 d-flex justify-content-center align-items-center">
        <div class="card" style="width: 500px;">
            <div class="card-title text-center m-3"><h1>Sign Up</h1></div>
            <div class="card-body">
                <form @submit.prevent="handleSubmit">
                    <!-- Name input -->
                    <div data-mdb-input-init class="form-outline mb-4">
                        <label class="form-label">Name</label>
                        <input 
                        type="text" 
                        id="name"
                        class="form-control"
                        v-model="form.name"
                        placeholder="Enter your name"
                        required />
                    </div>

                    <!-- Email input -->
                    <div data-mdb-input-init class="form-outline mb-4">
                        <label class="form-label">Email</label>
                        <input 
                        type="email" 
                        id="email"
                        class="form-control"
                        v-model="form.email"
                        placeholder="Enter your email"
                        required />
                    </div>

                    <!-- Password input -->
                    <div data-mdb-input-init class="form-outline mb-4">
                        <label class="form-label">Password</label>
                        <input 
                        type="password" 
                        id="password"
                        class="form-control"
                        v-model="form.password"
                        placeholder="Enter your password"
                        required />
                    </div>

                    <!-- Submit button -->
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init
                        class="btn btn-primary btn-block m-2">
                        Sign up
                    </button>
                    <button @click="loginPage()" data-mdb-button-init data-mdb-ripple-init
                        class="btn btn-outline-primary btn-block m-2">
                       Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
import router from '@/router';
import { useStore } from 'vuex';  // Import the Vuex store
import { ref } from 'vue';
import store from '@/stores/store';

const form = ref({
    name: '',
    email: '',
    password: ''
})

const handleSubmit = async () => {
  const register = await store.dispatch('register', form.value);

  if(register) {
    router.push('/login');
  }
};

const loginPage = () => {
    router.push('/login');
}
</script>

<style>
body,
html {
    background-color: hsl(0, 0%, 96%);
}
</style>