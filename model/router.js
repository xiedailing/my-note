import { createRouter, createWebHashHistory } from 'vue-router';
import NoteGrid from '../src/components/NoteGrid.vue';
import AddNote from '../src/components/AddNote.vue';
import EditNote from '../src/components/EditNote.vue';
import SearchNote from '../src/components/SearchNote.vue';


const routes = [
    {path:'/', name:'home', component: NoteGrid},
    {path:'/AddNote', name:'AddNote', component: AddNote},
    {path:'/edit/:id', name:'EditNote', component: EditNote},
    {path:'/search', name:'search', component: SearchNote}
];


const router = createRouter({
  routes,
  history: createWebHashHistory(import.meta.env.BASE_URL)
});

export default router;