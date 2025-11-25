<script setup>
import { reactive } from 'vue';

const listRoles = reactive([
    { value: 'admin', text: 'Quản trị viên (Admin)' },
    { value: 'staff', text: 'Nhân viên (Staff)' },
    { value: 'user', text: 'Người dùng (User)' }
]);

const formData = reactive({
    name: '',
    role: 'user' 
});

const listUsers = reactive([
    { id: 1, name: 'Nguyễn Văn A', role: 'admin' }
]);

const addUser = () => {
    if (formData.name.trim() === '') {
        alert("Vui lòng nhập tên!");
        return;
    }

    listUsers.push({
        id: Date.now(),
        name: formData.name,
        role: formData.role 
    });

    formData.name = '';
    formData.role = 'user'; 
    };
</script>

<template>
    <div class="container">
        <div class="form-box">
            <div class="form-group">
                <label>Tài khoản:</label>
                <input v-model="formData.name" placeholder="Nhập tên user..." />
            </div>
            <div class="form-group">
                <label>Vai trò:</label>

                <select v-model="formData.role" class="my-select">
                    <option disabled value="">-- Vui lòng chọn --</option>
                    <option 
                        v-for="(item, index) in listRoles" 
                        :key="index" 
                        :value="item.value"
                    >
                        {{ item.text }}
                    </option>
                </select>
            </div>

            <button @click="addUser">Thêm vào danh sách</button>
        </div>
        <hr />

        <div class="list-container" v-if="listUsers.length > 0">
            <h3>Danh sách ({{ listUsers.length }})</h3>
            <ul>
                <li v-for="u in listUsers" :key="u.id">
                    <span class="user-name">{{ u.name }}</span>
                    <span class="badge" :class="u.role">
                        {{ u.role }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 480px;
    margin: 40px auto;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
}

h2, h3 {
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 1.2rem;
}

.form-box {
    padding: 24px;
    border-radius: 8px; 
}

.form-group {
    margin-bottom: 16px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    font-weight: 500;
}

input, select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box; 
    transition: all 0.2s;
}
button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s;
}

.list-container {
    margin-top: 30px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
}

.user-name {
    font-weight: 500;
}

.badge {
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
}
</style>