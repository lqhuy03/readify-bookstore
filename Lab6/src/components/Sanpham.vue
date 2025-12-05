<template>
	<div class="sanpham-container">
		<div class="form-col">
			<h3>Thêm Sản Phẩm</h3>
			<div class="form-group">
				<label for="maSP">Mã SP</label>
				<input id="maSP" v-model="newProduct.maSP" class="form-control" placeholder="Nhập mã SP" />
			</div>

			<div class="form-group">
				<label for="tenSP">Tên SP</label>
				<input id="tenSP" v-model="newProduct.tenSP" class="form-control" placeholder="Nhập tên SP" />
			</div>

			<div class="form-group">
				<label for="gia">Giá</label>
				<input id="gia" type="number" v-model.number="newProduct.gia" class="form-control" min="0" />
			</div>

			<div class="form-group">
				<label for="giamGia">Giảm giá (%)</label>
				<input id="giamGia" type="number" v-model.number="newProduct.giamGia" class="form-control" min="0" max="100" />
			</div>

			<div class="form-group">
				<label>Giá sau giảm</label>
				<div class="price-preview">{{ formattedGiaSauGiam }}</div>
			</div>

			<div class="form-actions">
				<button class="btn btn-primary" @click="saveProduct">{{ editingIndex >= 0 ? 'Cập nhật' : 'Thêm' }}</button>
				<button class="btn btn-secondary" @click="editingIndex >= 0 ? cancelEdit() : resetForm()">{{ editingIndex >= 0 ? 'Hủy' : 'Làm lại' }}</button>
			</div>
		</div>

		<div class="table-col">
			<h3>Danh sách sản phẩm</h3>
			<table class="table table-bordered table-striped">
				<thead class="table-dark">
					<tr>
						<th>STT</th>
						<th>Mã SP</th>
						<th>Tên SP</th>
						<th>Giá</th>
						<th>Giá đã giảm</th>
						<th> Thao tác</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(p, idx) in products" :key="p.maSP + idx">
						<td>{{ idx + 1 }}</td>
						<td>{{ p.maSP }}</td>
						<td>{{ p.tenSP }}</td>
						<td>{{ formatCurrency(p.gia) }}</td>
						<td>{{ formatCurrency(p.giaSauGiam) }}</td>
						<td class="row-actions">
							<button class="btn btn-sm btn-outline-primary" @click="editProduct(idx)">Sửa</button>
							<button class="btn btn-danger btn-sm" @click="removeProduct(idx)">Xóa</button>
						</td>
					</tr>
					<tr v-if="products.length === 0">
						<td colspan="6" class="text-center">Chưa có sản phẩm</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newProduct = ref({ maSP: '', tenSP: '', gia: 0, giamGia: 10 })
const products = ref([])
const editingIndex = ref(-1)

const giaSauGiam = computed(() => {
	const g = Number(newProduct.value.gia) || 0
	const pct = Number(newProduct.value.giamGia) || 0
	// simplified: price * (100 - pct) / 100
	const result = g * (100 - pct) / 100
	return Math.round(result * 100) / 100
})

const formattedGiaSauGiam = computed(() => formatCurrency(giaSauGiam.value))

function saveProduct() {
	if (!newProduct.value.maSP.trim()) { alert('Vui lòng nhập mã SP'); return }
	if (!newProduct.value.tenSP.trim()) { alert('Vui lòng nhập tên SP'); return }
	if (Number(newProduct.value.gia) <= 0) { alert('Giá phải lớn hơn 0'); return }

	const giaNum = Number(newProduct.value.gia)
	const pct = Number(newProduct.value.giamGia) || 0
	const item = {
		maSP: newProduct.value.maSP.trim(),
		tenSP: newProduct.value.tenSP.trim(),
		gia: giaNum,
		giamGia: pct,
		giaSauGiam: Math.round((giaNum * (100 - pct) / 100) * 100) / 100
	}

	if (editingIndex.value >= 0) {
		products.value[editingIndex.value] = item
		editingIndex.value = -1
	} else {
		products.value.push(item)
	}

	resetForm()
}

function editProduct(index) {
	const p = products.value[index]
	if (!p) return
	newProduct.value = { maSP: p.maSP, tenSP: p.tenSP, gia: p.gia, giamGia: p.giamGia }
	editingIndex.value = index
}

function cancelEdit() {
	resetForm()
	editingIndex.value = -1
}

function resetForm() {
	newProduct.value = { maSP: '', tenSP: '', gia: 0, giamGia: 10 }
}



function removeProduct(index) {
	if (index >= 0 && index < products.value.length) products.value.splice(index, 1)
}

function formatCurrency(v) {
	return Number(v).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
</script>

<style scoped>
.sanpham-container { display: flex; gap: 24px; align-items: flex-start; }
.form-col { width: 320px; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa }
.table-col { flex: 1; }
.form-group { margin-bottom: 12px; }
.form-group label { display:block; margin-bottom:6px; font-weight:600; }
.price-preview { padding: 8px 12px; background: #fff; border: 1px solid #ddd; border-radius:4px }
.form-actions { display:flex; gap:8px; margin-top:8px }
.text-center { text-align: center }
</style>