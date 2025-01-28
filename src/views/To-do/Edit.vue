<template>
    <NavBar />
  
    <!--Edit page start here-->
    <div class="d-flex p-5 m-5">
      <div class="container bg-white shadow rounded" style="max-width: 400px;">
        <div class="text-center m-3">
          <h3>Edit Task</h3> <!-- Updated title to "Edit Task" -->
        </div>
        <form @submit.prevent="updateTask">
          <!-- Task input -->
          <div class="form-outline mb-4">
            <label class="form-label">Task</label>
            <input 
              type="text" 
              id="task"
              v-model="task.title"
              class="form-control"
              placeholder="Enter your task"
              required />
          </div>
  
          <!-- Task Detail -->
          <div class="form-outline mb-4">
            <label class="form-label">Detail</label>
            <input 
              type="text" 
              id="detail"
              v-model="task.detail"
              class="form-control"
              placeholder="Enter the detail"
              required />
          </div>

          <!--Status-->
            <div class="form-outline mb-4">
            <label class="form-label">Status</label>
            <div>
                <div class="form-check form-check-inline">
                <input 
                    class="form-check-input" 
                    type="radio" 
                    id="statusPending" 
                    :value="1" 
                    v-model="task.completed" 
                    required />
                <label class="form-check-label" for="statusPending">Completed</label>
                </div>

                <div class="form-check form-check-inline">
                <input 
                    class="form-check-input" 
                    type="radio" 
                    id="statusCompleted" 
                    :value="0"
                    v-model="task.completed" 
                    required />
                <label class="form-check-label" for="statusCompleted">Not Completed</label>
                </div>
            </div>
            </div>
  
          <!-- Submit button -->
          <button type="submit" data-mdb-button-init data-mdb-ripple-init
            class="btn btn-primary btn-block m-2">
            Update
          </button>
          <button type="button" @click="resetForm" data-mdb-button-init data-mdb-ripple-init
            class="btn btn-outline-primary btn-block m-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </template>
  
<script setup>
import NavBar from '@/components/NavBar.vue';
import { useStore } from 'vuex';
import router from '@/router';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Get access to route params
const store = useStore(); // Access Vuex store

const task = ref({
title: '',
detail: '',
completed: false,
});

// Function to fetch task by ID
const fetchTask = async () => {
const taskId = route.params.id; // Get the ID from the route
const accessToken = localStorage.getItem('accessToken');

try {
    const response = await axios.get(`http://amtis.opengw.net:8088/todo-app/public/api/v1/task/${taskId}/show`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
    });


    task.value = response.data.data; // Assign the fetched task data
    console.log('tasks', task.value);
} catch (error) {
    console.error('Error fetching task:', error);
}
};

// Function to update the task
const updateTask = async () => {
const taskId = route.params.id; // Get the ID from the route
const accessToken = localStorage.getItem('accessToken');

try {
    await axios.post(`http://amtis.opengw.net:8088/todo-app/public/api/v1/task/${taskId}/update`, 
    {
    title: task.value.title,
    detail: task.value.detail,
    completed: task.value.completed,
    },
    {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
    });

    alert('Task updated successfully!');
    router.push('/home');
} catch (error) {
    console.error('Error updating task:', error);
}
};

const resetForm = () => {
router.push('/home');
}
// Fetch the task data when the component is mounted
onMounted(fetchTask);

</script>
