<template>
  <div class="container mt-5 mb-5">
    <h2 class="mb-4">Quản lý Học sinh</h2>
    <div class="row">
        
        <form @submit.prevent="submitForm" class="col-sm-4">
            <h3 class="mb-4 text-success">{{ isEditing ? 'Cập nhật học sinh' : 'Thêm học sinh' }}</h3>
            
            <div class="mb-3 mt-3">
                <label for="name">Họ tên:</label>
                <input type="text" class="form-control" v-model="student.name" id="name" required />
            </div>

            <div class="mb-3">
                <label for="score">Điểm: </label>
                <input type="number" max="10" min="0" class="form-control" v-model.number="student.score" id="score" required />
            </div>

            <div class="mb-3">
                <label for="dob">Ngày sinh: </label>
                <input type="date" class="form-control" v-model="student.dob" id="dob" required />
            </div>
            
            <button type="submit" class="btn" :class="isEditing ? 'btn-warning' : 'btn-success'"> 
                {{ isEditing ? 'Cập nhật' : 'Thêm' }}
            </button>
        </form>

        <div class="col-sm-8">
            <h3 class="mb-4 text-danger">Danh sách học sinh</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Họ và tên</th>
                        <th>Điểm</th>
                        <th>Ngày sinh</th>
                        <th colspan="2">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stu, index) in students" :key="index">
                        <td>{{ stu.name }}</td>
                        <td>{{ stu.score }}</td>
                        <td>{{ stu.dob }}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="editStudent(index)">Sửa</button>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click="deleteStudent(index)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 1. Dữ liệu mẫu ban đầu 
const students = ref([
    { name: 'Nguyễn Chí Hùng', score: 8, dob: '2006-01-01'},
    { name: 'Phạm Thị Lan', score: 9, dob: '2006-05-15'}
]);

// 2. Biến quản lý trạng thái form
const student = ref({ name: '', score: null, dob: '' });
let isEditing = ref(false); // Trạng thái: False = Thêm mới, True = Sửa
let editingIndex = ref(null); // Index của sinh viên đang sửa

// 3. Hàm reset form 
const resetForm = () => {
    student.value = { name: '', score: null, dob: '' };
    isEditing.value = false;
    editingIndex.value = null;
};

// 4. Hàm Thêm/Cập nhật 
const submitForm = () => {
    if (isEditing.value) {
        // CẬP NHẬT: Sao chép dữ liệu mới vào vị trí cũ 
        students.value[editingIndex.value] = { ...student.value };
    } else {
        // THÊM MỚI: Thêm dữ liệu vào cuối mảng 
        students.value.push({ ...student.value });
    }
    resetForm();
};

// 5. Hàm Sửa 
const editStudent = (index) => {
    // 1. Lấy dữ liệu của học sinh muốn sửa và đưa lên form
    student.value = { ...students.value[index] }; 
    // 2. Chuyển sang chế độ sửa
    isEditing.value = true;
    // 3. Lưu lại index đang sửa
    editingIndex.value = index;
};

// 6. Hàm Xóa 
const deleteStudent = (index) => {
    // Dùng splice để xóa 1 phần tử tại vị trí index
    students.value.splice(index, 1);
};
</script>