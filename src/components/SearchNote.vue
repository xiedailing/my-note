<template lang="">
    <div class="container">
        <div class="row g-3">
            <h3 class="mb-3 text-start">搜尋結果: {{todoStore.keyword}}</h3>
            <div class="col-4" v-for="note in todoStore.searchResults">
                <div class="card">
                    <div class="card-body">
                        <i v-if="note.isPinned" class="fa-solid fa-thumbtack me-2 pinned"></i>
                        <i v-else class="fa-solid fa-thumbtack me-2"></i>
                        <h5 class="card-title">
                            <router-link class="text-decoration-none link-primary" :to="{ name: 'EditNote', params: { id: note.id } }">
                            {{ note.item }}
                            </router-link>
                            </h5>
                        <p class="card-text">{{ note.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>
    import { ref } from 'vue';
    import { useTodoStore } from '../stores/myNote_store'

    const todoStore = useTodoStore();
</script>


<style scoped>
    .pinned {
        color: red;
    }
    .fa-thumbtack {
        position: absolute;
        left: 5px;
        top: 10px
    }
</style>