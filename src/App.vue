<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import NoteList from './components/NoteList.vue';
import NoteGrid from './components/NoteGrid.vue';

import { useTodoStore } from './stores/myNote_store.js';

const todoStore = useTodoStore();
const keyword = ref('');
const router = useRouter();

function goSearch(){
  todoStore.searchNote(keyword.value);
  router.push({ name: 'search' });
}


</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><img src="/note_logo.png" alt="" class="logo">My Note</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="d-flex" role="search" @submit.prevent="goSearch">
            <input v-model="keyword" class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <div class="container">
      <div class="row">
        <div class="col-3 pt-3">
          <!-- 選單 -->
          <NoteList />
        </div>
        <div class="col-9 pt-3">
          <!-- 內容 -->
          <!-- <router-view>
            <transition name="fade" mode="out-in">
              <component :is="component"></component>
            </transition>
          </router-view> -->


          <RouterView :key="$route.fullPath"></RouterView>

        </div>
      </div>
    </div>
  </main>

  <hr>

  <footer>
    <p>&copy; 2026 Ispan Vue.js</p>
  </footer>
</template>

<style scoped>
.logo {
  width: 40px;
}
</style>
