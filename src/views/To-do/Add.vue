<template>
   <NavBar />
  <div class="d-flex justify-content-center mt-5">
    <div class="container bg-white shadow rounded p-5 m-5" style="max-width: 400px;">
      <div class="text-center mt-3">
        <p>Welcome, {{ userEmailPrefix }}!</p>
      </div>
      <div class="text-center m-3">
        <h3>Add Task</h3>
      </div>
      <form @submit.prevent="addTugas">
        <!-- Task input -->
        <div class="form-outline mb-4">
          <label class="form-label">Task</label>
          <input type="text" id="task" class="form-control" v-model="task.title" placeholder="Enter your task"
            required />
        </div>

        <!-- Task Detail -->
        <div class="form-outline mb-4">
          <label class="form-label">Detail</label>
          <input type="text" id="detail" class="form-control" v-model="task.detail" placeholder="Enter the detail"
            required />
        </div>

        <!-- Submit button -->
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block m-2">
          Add
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
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import router from '@/router';
import { MyHelper } from '@/composables/MyHelper';

// Access vuex store
const store = useStore();
// Access MyHelper
const { capitalizeWord } = MyHelper()
//Define task
const task = ref({
  title: '',
  detail: '',
});

// To get the name from email, from localStorage
const userEmail = computed(() => store.getters.getUserEmails);
// Computed property to extract the part of the email before '@'
const userEmailPrefix = computed(() => {
  if (userEmail.value) {
    return capitalizeWord(userEmail.value.split('@')[0]);
  }
  return '';
});

// Add task function
const addTugas = async () => {
  try {
    await store.dispatch('addTask', {
      title: task.value.title,
      detail: task.value.detail,
      completed: false,
    });
    alert('Task Added!');
    router.push('/home');
    resetForm();
  } catch (error) {
    alert('An error occurred while adding the task. Please try again.');
  }
};

// Reset form fields
const resetForm = () => {
  task.value.title = '';
  task.value.detail = '';
};

</script>