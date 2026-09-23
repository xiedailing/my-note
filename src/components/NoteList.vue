<template lang="">
    <RouterLink to="/AddNote" class="btn btn-primary d-flex justify-content-center mb-2">新增筆記</RouterLink>

    <h3 class="text-start">重要筆記</h3>
    <ul class="list-group mb-4">
        <li class="list-group-item d-flex justify-content-between align-items-center " 
            v-for="(note, index) in todoStore.pinnedNotes" :key="note.id">
            <router-link class="link-primary text-decoration-none" :to="{ name: 'EditNote', params: { id: note.id } }">
            {{ note.item }}
            </router-link>
            <div class="btn-group">
                <i class="fa-solid fa-thumbtack me-2 pinned" @click="todoStore.pinnedNote(note.id)"></i>
                <i 
                class="fa-solid fa-trash-can"
                @click="askDelete(note)"
                ></i>
            </div>
        </li>
    </ul>
    
    <h3 class="text-start">所有筆記</h3>
    <ul class="list-group mb-4">
        <li class="list-group-item d-flex justify-content-between align-items-center " 
        v-for="(note, j) in todoStore.allNotes" 
        :key="note.id">
        <router-link class="link-primary text-decoration-none" :to="{ name: 'EditNote', params: { id: note.id } }">
        {{ note.item }}
        </router-link>
        <div class="btn-group">
            <i class="fa-solid fa-thumbtack me-2" @click="todoStore.pinnedNote(note.id)"></i>
            <i 
            class="fa-solid fa-trash-can"
            @click="askDelete(note)"
            ></i>
        </div>
        </li>
    </ul>

    <!-- 刪除確認彈窗 -->
    <div class="modal d-block" tabindex="-1" v-if="notToDelete">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">刪除筆記</h5>
            <button type="button" class="btn-close"  aria-label="Close"
            @click="cancelDelete"></button>
        </div>
        <div class="modal-body">
            <p class="text-start">確定要刪除「{{ notToDelete.item }}」嗎?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-cancel" @click="cancelDelete()">取消</button>
            <button type="button" class="btn btn-warning" @click="confirmDelete">
                確認刪除
            </button>
        </div>
        </div>
    </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue';
    import { useTodoStore } from '../stores/myNote_store'

    const todoStore = useTodoStore();
    const { pinnedNotes, deleteNote } = todoStore;

    const notToDelete = ref(null);

    function askDelete(note){
        notToDelete.value = note;
        console.log(note.item);
    };
    function cancelDelete(){
        notToDelete.value = null
    };
    function confirmDelete(){
        deleteNote(notToDelete.value.id)
        notToDelete.value = null
    };

</script>
<style scoped>
    .pinned {
        color: red;
    }

    .btn-group i:hover {
        color: brown;
        cursor: pointer;
    }
</style>