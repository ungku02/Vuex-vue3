import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/To-do/Register.vue'
import Login from '../views/To-do/Login.vue'
import Home from '../views/To-do/Home.vue'
import Edit from '../views/To-do/Edit.vue'
import Add from '../views/To-do/Add.vue'

const routes = [
  // To-do App
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: { requiresAuth: true } // Protecting the Add route
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } // Protecting the Home route
  },
  {
    path: `/edit/:id`,
    name: 'Edit',
    component: Edit,
    meta: { requiresAuth: true } // Protecting the Edit route
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Global navigation guard -> runs before every route change
router.beforeEach((to, from, next) => { 
  // 1. to -> route yang pengguna nak navigate
  // 2. from -> current route (route yg user berada sekarang)
  // 3. next -> A function that must be called to resolve the navigation (either allowing or blocking it).
  const token = localStorage.getItem('accessToken'); // Check for auth token

  if (to.matched.some(record => record.meta.requiresAuth)) { //meta.requiresAuth -> nak tentukan route mana yang kena authenticate -> refer list route dekat atas
    // The 'to.matched' array checks if any of the matched routes have a meta.requiresAuth field set to true
    // If route requires auth and token is not present, redirect to login
    if (!token) {
      next({ name: 'Login' });
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Proceed if route does not require authentication
  }
});

export default router;
