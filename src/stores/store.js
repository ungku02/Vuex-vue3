import { createStore } from "vuex";
import axios from 'axios';

const store = createStore({
    state: { // Sore the data that wanted to be use globally across the app
        accessToken: localStorage.getItem('accessToken') || null,
        tasks: [],
        userEmail: localStorage.getItem('email') ,
        isLoading: false
    },
    mutations: { // methods/functions that change the data in the state
        setAccessToken(state, token) {
            state.accessToken = token;
            localStorage.setItem('accessToken', token);
        },
        setUserEmail(state, email) {
            state.userEmail = email;
            localStorage.setItem('userEmail', email);
        },
        removeAccessToken(state) {
            state.accessToken = null;
            localStorage.clear();
        },
        setTasks(state, tasks){
            state.tasks = tasks;
        },
        addTask(state, tasks) {
            state.tasks.push(task);
        },
        updateTask(state, updatedTask) {
            state.tasks = state.tasks.map(task => {
                if(task.id === updatedTask.id) {
                    return updatedTask;
                }
                else {
                    return task;
                }
            });
        },
        deleteTask (state, taskId) {
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        },
        toogleLoading(state)
        {
            state.isLoading - !state.isLoading;
        }
    },

    actions: { // Task that your app can do -> use for asynchronous operations (allow program to perform tasks that may take time without blocking the execution of other tasks)
        //Register
        async register({ commit }, userData) {
            const response = await axios.post('http://amtis.opengw.net:8088/todo-app/public/api/v1/user/register', userData);
            if (response.status === 200) {
                alert('Registration Successful!')
            }
            else {
                alert('Registration Failed');
            }
        },
        // Login
        async login({ commit }, credentials) {
            const response = await axios.post('http://amtis.opengw.net:8088/todo-app/public/api/v1/login', credentials);
            const token = response.data.access_token;
            const email = response.data.email;  
            // console.log('email', email); // Debug
            commit('setAccessToken', token);// store token -> untuk authenticate
            commit('setUserEmail', email); // store email dia-> untuk naming
           
        },
        // Get the task data from teh API
        async fetchTasks({ commit }) {
            const accessToken = this.state.accessToken;
          
            const response = await axios.get('http://amtis.opengw.net:8088/todo-app/public/api/v1/task', {
                headers: {
                    'Authorization' : `Bearer ${accessToken}`,
                },
            });
            commit('setTasks', response.data.data);
        },
        // Add new task by request post to the API
        async addTask({ commit, dispatch }, task) {
            const accessToken = this.state.accessToken;
            const response = await axios.post('http://amtis.opengw.net:8088/todo-app/public/api/v1/task/store', {
                title: task.title,
                detail: task.detail,
                completed: false,
              },
              {
                headers: {
                    'Authorization' : `Bearer ${accessToken}`,
                },
            });
            commit('addTask', response.data.data);
            await dispatch('fetchTasks'); 
        },
        // Update Task
        async updateTask({ commit }, updatedTask) {
            const accessToken = this.state.accessToken;
            await axios.post(`http://amtis.opengw.net:8088/todo-app/public/api/v1/task/${updatedTask.id}/update`,
                updatedTask, {
                    headers: {
                        'Authorization' : `Bearer ${accessToken}`,
                    },
            });
            commit('updateTask', updatedTask);
            await dispatch('fetchTasks');    
        },
        // Delete Task
        async deleteTask({ commit, dispatch}, taskId) {
            const accessToken = this.state.accessToken;
            await axios.delete(`http://amtis.opengw.net:8088/todo-app/public/api/v1/task/${taskId}/delete`, {
                headers: {
                    'Authorization' : `Bearer ${accessToken}`,
                }
            });
            commit('deleteTask', taskId);
            await dispatch('fetchTasks');    
        },
        // Logout (Takde async sebab takde guna API operation)
        logout({ commit }) {
            commit('removeAccessToken');
        },
        triggerLoading({ commit })
        {
            commit('toogleLoading')
        }
    },
    getters: { // Fetch data
        isAuthenticated(state) {
          return !!state.accessToken; // Tukar jadi boolean, xnak value dia
        },
        getTasks(state) {
          return state.tasks;
        },
        getUserEmails(state) {
            return state.userEmail; //Yang ni dia amek dari State
        },
        getLoading(state) {
            return state.isLoading;
        }
    }
});

export default store; // Nak bagi Vuex store available untuk semua components dalam application