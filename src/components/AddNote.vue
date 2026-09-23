<template lang="">
    <div class="card p-4">
        <div class="mb-3">
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="請輸入標題..." v-model="title">
    </div>
    <div class="mb-3">
        <textarea 
            class="form-control" 
            rows="5" 
            placeholder="請輸入內容..." 
            v-model="content">
        </textarea>
        <button
            type="button"
            class="btn btn-primary mt-3"
            :disabled="!title.trim()"
            @click="saveNote"
        >
            儲存筆記
        </button>
    </div>

        <div class="mb-3 text-start">
            <hr class="mb-3">
            <h4><i class="fa-solid fa-list-check"></i>代辦事項</h4>
            
            <div class="input-group mb-3">
                <input type="text" 
                class="form-control" 
                placeholder="請輸入代辦事項" 
                v-model="new_item" 
                @keydown.enter.prevent="addTask">

            </div>

            <div v-for="(task, i) in tasks" :key="task.id" class="d-flex justify-content-between" >
                <input 
                type="checkbox" 
                class="form-check-input me-1"
                v-model="task.isFinished"
                >
                <span class="w-100 mb-2" 
                :class="{'finished-line': task.isFinished}"
                >
                    {{ task.item }}
                </span>
                <i 
                class="fa-solid fa-xmark"
                @click="tasks.splice(i, 1)"
                ></i>
            </div>
        </div>
    </div>
    



</template>


<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/myNote_store'

const todoStore = useTodoStore()
const new_item = ref('')

const tasks = ref([])
function addTask(){
    const item = new_item.value.trim()
    if (!item) return

    tasks.value.push({
        id: Date.now(),
        item,
        isFinished: false
    })

    new_item.value=""
}

const title = ref('')
const content = ref('')
function saveNote(){
    if (!title.value.trim()) return

    addTask()

    const success = todoStore.addNote(
        title.value,
        content.value,
        tasks.value
    )

    if (success) {
        title.value= ''
        content.value= ''
        new_item.value= ''
        tasks.value=[]
    }

}

</script>


<style scoped>
    .fa-xmark:hover{
        color: antiquewhite;
        width: 20px;
        height: 20px;
        background-color: brown;
        border-radius: 6px;
    }

    .finished-line {
        text-decoration: line-through;
    }
</style>