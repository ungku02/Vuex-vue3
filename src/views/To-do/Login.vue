<template>
    <div class="container vh-100 d-flex justify-content-center align-items-center">
                <div class="card" style="width: 500px;">
                    <div class="card-title text-center m-3"><h1>Login</h1></div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
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
                               Login
                            </button>
                            <button @click="signupPage()" data-mdb-button-init data-mdb-ripple-init
                                class="btn btn-outline-primary btn-block m-2">
                               Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
</template>

<script setup>
import router from '@/router';
import store from '@/stores/store';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';


// Define the form
const form = ref({
email: '',
password: ''
})



const handleSubmit = async () => {
    const login = await store.dispatch('login', form.value);
        router.push('/home');
    
}


const signupPage = () => {
router.push('/');
}
</script>

<style>
body,
html {
background-color: hsl(0, 0%, 96%);
}
</style>