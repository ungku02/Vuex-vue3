<template>
  <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse">
            <!-- Left links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>

          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add">Add</router-link>

          </li>
        </ul>
        <!-- Left links -->

          <!-- Right elements -->
          <div class="d-flex align-items-center">
            <!-- Avatar -->
            <div>
            
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  class="rounded-circle"
                  height="35"
                  alt="User Avatar"
                  loading="lazy"
                />
            
              
            </div>
          </div>
          <button class="btn btn-outline-secondary m-2" @click="logoutPage()">Logout</button>
          <!-- Right elements -->
        </div>
      </div>
    </nav>
    <!-- Navbar -->
  </header>
</template>

<script setup>
import router from '@/router';

const logoutPage = () => {
localStorage.clear();  //Clear all data in local storage -> best practice to clear specific data
  router.push('/');
}

</script>

<style>
/* Hover effect */
.navbar-nav .nav-link:hover {
  background-color: #f8f9fa; /* Light background on hover */
  color: #007bff; /* Bootstrap primary color for text */
}
</style>

