<script setup>
defineProps({
    search: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <div class="bad-catalogue-container">
        <p class="title mb-5">Lo sentimos...</p>

        <p class="info">No pudimos encontrar resultados para <strong>"{{ search }}"</strong></p>
        <!-- <p class="info">¿Quizá quisiste decir?</p> -->
    </div>
</template>

<style scoped></style>