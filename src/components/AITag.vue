<template>
    <el-check-tag :checked="checked" @change="onChange" size = 'large'>{{ props.tagName }}</el-check-tag>
</template>

<script setup>
import { ref } from 'vue'
    const checked = ref(false)
    const props = defineProps(['callback','tagName'])
    const onChange = (status) => {
        checked.value = status
        props.callback(props.tagName, status)
    }
</script>

<style>
.el-check-tag {
    margin: 20px;
}
</style>