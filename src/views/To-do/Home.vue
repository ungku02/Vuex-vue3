<template>
  <NavBar />

  <div class="container mt-4">
    <h1>{{ userEmailPrefix }} Task List:</h1>
    <div class="d-flex justify-content-end">
    <button class="btn btn-outline-success m-3 " @click="router.push('/add')">+ Add task</button>
    </div>
    <!-- Task Table -->
    <div class="table-responsive bg-white shadow rounded mb-3 p-4">
      <table class="table table-bordered table-striped">
        <thead class="table-light">
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 15%">Title</th>
            <th style="width: 30%">Detail</th>
            <th style="width: 10%">Completed</th>
            <th class="text-center" style="width: 10%">Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through paginated tasks and display each task in a row -->
          <tr v-for="(task, index) in paginatedTasks" :key="task.id">
            <td>{{ index + 1 + (currentPage - 1) * tasksPerPage }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.detail }}</td>
            <td>{{ task.completed_status }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <button class="btn btn-outline-warning m-1" @click="editData(task)">Edit</button>
                <button class="btn btn-outline-danger m-1" @click="deleteData(task.id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Bootstrap Pagination -->
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import router from '@/router';

// Access vuex store
const store = useStore();
// //Define task
// const task = ref({
//   title: '',
//   detail: '',
// });
// Pagination state
const currentPage = ref(1);
const tasksPerPage = 5;


// To fetch tasks
const tasks = computed(() => store.getters.getTasks);
// To get the name from email, from localStorage
const userEmail = computed(() => store.getters.getUserEmails);
// Computed property to extract the part of the email before '@'
const userEmailPrefix = computed(() => {
  if (userEmail.value) {
    return userEmail.value.split('@')[0];
  }
  return '';
});

// Fetch tasks on component mount
const fetchTasks = () => {
  store.dispatch('fetchTasks');
};
// Add task function
const addTugas = async () => {
  try {
    await store.dispatch('addTask', {
      title: task.value.title,
      detail: task.value.detail,
      completed: false,
    });
    alert('Task Added!');
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

// Delete data function
const deleteData = async (id) => {
  try {
    await store.dispatch('deleteTask', id);
    alert('Task deleted!');
  } catch (error) {
    alert('An error occurred while deleting the task.');
  }
};


// Render to the Edit.vue page
const editData = (task) => {
  router.push(`/edit/${task.id}`);
}

// Pagination logic
const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * tasksPerPage;
  return tasks.value.slice(start, start + tasksPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(tasks.value.length / tasksPerPage);
});

// Change the current page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// Fetch tasks when the component is mounted
onMounted(fetchTasks);

// The onMounted() hook specifically runs after the component is mounted onto the DOM. 
// This means the component is fully initialized, and its template has been rendered on the screen.
</script>