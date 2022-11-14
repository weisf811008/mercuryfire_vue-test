import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useUserStore = defineStore('useUserStore', () => {
  const userList = ref([])
  const rules = ref({
    username: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
    userage: [{ required: true, message: '請輸入年齡', trigger: 'blur' }],
  })

  const createUser = (user) => {
    userList.value.push({
      id: nanoid(),
      username: user.username,
      userage: user.userage,
    })
  }

  const updateUser = (id, data) => {
    userList.value.forEach((user) => {
      if (user.id === id) {
        user.username = data.username
        user.userage = data.userage
      }
    })
  }

  const deleteUser = (id) => {
    userList.value = userList.value.filter((user) => user.id !== id)
  }

  return {
    userList,
    rules,
    createUser,
    updateUser,
    deleteUser,
  }
})
