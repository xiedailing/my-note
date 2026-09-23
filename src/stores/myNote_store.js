import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({ 
    notes: [
          {
            id: 1, 
            item: '去康是美', 
            content: '補生活用品',
            isFinished: true,
            isPinned: true
          },
            {
              id: 2, 
              item: '繳費', 
              content: '最晚9/22前要繳',
              isFinished: false,
              isPinned: true
            },
            {
              id: 3, 
              item: '訂餐廳', 
              content: '妹妹生日10/5',
              isFinished: false,
              isPinned: false
            },
            {
              id: 4, 
              item: '拉伸', 
              content: '拉伸身體舒緩壓力',
              isFinished: false,
              isPinned: false
            }
        ],
    
    keyword:'',
    searchResults:[],
    
    tasks: [
      {
        id: 1,
        item:'買衛生紙',
        isFinished: false
      },
      {
        id: 2,
        item:'買洗髮精',
        isFinished: false
      }
    ]
  }),

  getters: {
    completedTask(state){
        console.log(state);
        return state.tasks.filter(task => task.isFinished)
    },

    unFinishedTasks: (state) => state.tasks.filter(task => !task.isFinished),
    
    
    pinnedNotes(){
      return this.notes.filter(note => note.isPinned)      
    },

    allNotes(){
      return this.notes.filter(note => !note.isPinned)
    }
  },

  actions: {
    // 新增任務
    addTask(item) {
      if (!item || !item.trim()) return;
      
      // 💡 確認陣列名稱是 notes 還是 tasks（假設你的 state 叫做 notes）
      this.tasks.push({
        id: Date.now(),
        item: item,
        isFinished: false
      });
    },

    // 切換完成狀態
    toggleTask(index) {
      this.tasks[index].isFinished = !this.tasks[index].isFinished;
    },

    // 刪除任務
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },

    deleteNote(id) {
      // 找到對應id資料的索引值
      const index = this.notes.findIndex(note => note.id === id)

      if (index !== -1) {
        this.notes.splice(index, 1)
      }
    },

    pinnedNote(id){
      const pin_note = this.notes.find(note => note.id === id)
      if (pin_note) {
      pin_note.isPinned = !pin_note.isPinned;
      }
    },

    // 新增note
    addNote(item, content, tasks = []) {
      const title = item.trim()
      if (!title) return false

      this.notes.push({
        id: Date.now(),
        item: title,
        content,
        isFinished: false,
        isPinned: false,
        tasks: tasks.map(task => ({ ...task }))
        // tasks: tasks.map(function (task) {
        // return { ...task };

      })
      return true
    },

    oneNote(id){
      const note = this.notes.find(note => note.id === id)
      return note
    },

    editNote(id, item, content, tasks){
      const title = item.trim()
      const note = this.notes.find(note => note.id === id)
      if (!note || !title) return false

      note.item = title
      note.content = content
      if (tasks !== undefined) {
        note.tasks = tasks.map(task => ({ ...task }))
      }
      return true
    },

    searchNote(keyword){
      this.keyword = keyword.trim();
      this.searchResults = this.notes.filter(note => 
        note.item.includes(this.keyword) ||
        note.content.includes(this.keyword)
      );
    }
  }
})
