<template>
  <div id="app">
    <el-form
      ref="formRef"
      :model="user"
      :rules="rules"
      status-icon
      hide-required-asterisk
      label-width="100px"
      class="demo-formRef"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="user.username"
          autocomplete="off"
          placeholder="請輸入姓名"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="userage">
        <el-input
          type="number"
          v-model.number="user.userage"
          placeholder="請輸入年齡"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-if="!user.isEdit"
          @click.prevent="() => handleCreateUser(formRef)"
        >
          確認
        </el-button>
        <el-button
          type="primary"
          v-else
          @click.prevent="() => handleUpdateUser(formRef)"
        >
          確認
        </el-button>
        <el-button @click.prevent="() => resetform(formRef)">取消</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="userage" label="年齡" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="EditPen"
            @click.prevent="() => handleUpdate(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            @click.prevent="() => handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'

const userStore = useUserStore()
const { userList, rules } = storeToRefs(userStore)
const { getUserList, createUser, updateUser, deleteUser } = userStore

const formRef = ref()

const user = ref({
  id: null,
  username: '',
  userage: '',
  isEdit: false,
})

const handleCreateUser = (form) => {
  form.validate((valid, fields) => {
    if (valid) {
      try {
        createUser(user.value)
        ElNotification({
          type: 'success',
          message: '新增成功',
        })
        resetform()
      } catch (e) {
        console.error(e)
        ElNotification({
          type: 'error',
          message: '新增失敗',
        })
      }
    }
  })
}

const handleUpdate = (row) => {
  user.value = {
    id: row.id,
    username: row.username,
    userage: row.userage,
    isEdit: true,
  }
}

const handleUpdateUser = (form) => {
  form.validate((valid, fields) => {
    if (valid) {
      console.log(user.value)
      try {
        updateUser(user.value.id, user.value)
        ElNotification({
          type: 'success',
          message: '修改成功',
        })
      } catch (e) {
        console.error(e)
        ElNotification({
          type: 'error',
          message: '修改失敗',
        })
      }
    }
  })
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`是否確定要刪除${row.username}`, '', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      try {
        deleteUser(row.id)
        ElNotification({
          type: 'success',
          message: '刪除成功',
        })
      } catch (e) {
        console.error(e)
        ElNotification({
          type: 'error',
          message: '刪除失敗',
        })
      }
    })
    .catch(() => {
      ElNotification({
        type: 'info',
        message: '取消刪除',
      })
    })
}

const resetform = () => {
  formRef.value.resetFields()
  formRef.value.clearValidate()
  user.value.isEdit = false
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-form-item__content {
  display: flex;
  justify-content: center;
}
</style>
