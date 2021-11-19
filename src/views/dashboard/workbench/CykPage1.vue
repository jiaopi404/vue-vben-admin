<template>
  <div class="cyk-page-1">
    <ul>
      <li v-for="item in 10" :key="item">{{ `${item}`.repeat(10) }}</li>
    </ul>
  </div>
  <div class="mt-5">
    <LxPagination @register="register" />
  </div>
  <div class="m-5">
    <button class="mr-2" @click="setTotal(50)">set total 50</button>
    <button class="mr-2" @click="setCurrentPage(2)">set total 50</button>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useLxPagination, LxPagination } from '/@/components/LxComponents';

  const [register, { setTotal, setCurrentPage, doAfterPageChange }] = useLxPagination();

  onMounted(() => {
    doAfterPageChange((page, pageSize) => {
      console.log('page changed: ', page, pageSize);
      console.log('假装是reload', 20023923);
    });
  });
</script>
