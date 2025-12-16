<script setup>
    const count = 0;
    const message = "Hello, Slide 4!";

     import { ref } from 'vue';

    const count2 = ref(0);
    const message2 = ref(0)
        
</script>
<template>
    <div>
        <h1>{{ message }}</h1>
        <button @click="count++">Count is: {{ count }}</button>
    
        <h1>{{ message2 }}</h1>
        <button @click="count2++">Count2 is: {{ count2 }}</button>
    </div>   
</template>
<style>
</style>