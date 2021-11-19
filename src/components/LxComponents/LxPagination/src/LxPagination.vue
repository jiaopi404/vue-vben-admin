<template>
  <Pagination
    v-model:current="page"
    v-model:pageSize="pageSize"
    :total="total"
    v-bind="getProps"
    @change="changeHandler"
    @show-size-change="showSizeChangeHandler"
  />
</template>

<script lang="ts" setup>
  import { useAttrs, PropType, computed, ref, getCurrentInstance } from 'vue';
  import { Pagination, PaginationProps } from 'ant-design-vue';
  import { omit } from 'lodash-es';
  import { LxPageChangeCb, LxPaginationActionType } from '..';

  const attrs: PaginationProps = useAttrs();
  const props: PaginationProps = defineProps({
    defaultPageSize: {
      type: Number as PropType<number>,
      default: 10,
    },
    pageSizeOptions: {
      type: Array as PropType<string[]>,
      default: () => ['10', '20', '50', '100', '500', '1000', '2000'],
    },
    showTotal: {
      type: Function as PropType<(total: number, range: number[]) => string>,
      default: (total) => `共 ${total} 条数据`,
    },
    size: {
      type: String as PropType<string>,
      default: 'small',
    },
    // todo show total
  });
  const emit = defineEmits(['change', 'register']);

  const page = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(0);
  const doAfterPageChangeFunc = ref<Nullable<Function>>(null);

  const getProps = computed(() => {
    return omit(
      { ...props, ...attrs },
      'current',
      'pageSize',
      'total',
      'onChange',
      'onShowSizeChange',
    );
  });

  // methods
  const changeHandler = (page, pageSize) => {
    emit('change', { page, pageSize });
    if (doAfterPageChangeFunc.value) {
      doAfterPageChangeFunc.value(page, pageSize);
    }
  };
  const showSizeChangeHandler = (current, size) => {
    console.log(
      '🚀 ~ file: LxPagination.vue ~ line 43 ~ showSizeChangeHandler ~ current, size',
      current,
      size,
    );
  };

  // expose
  function setTotal(_total: number) {
    total.value = _total;
  }
  function setCurrentPage(_page: number, _pageSize: number = props.defaultPageSize || 10) {
    page.value = _page;
    pageSize.value = _pageSize;
  }
  function doAfterPageChange(cb: LxPageChangeCb) {
    doAfterPageChangeFunc.value = cb;
  }

  const _expose: LxPaginationActionType = {
    setTotal,
    setCurrentPage,
    doAfterPageChange,
  };
  const instance = getCurrentInstance();
  if (instance) {
    emit('register', _expose, instance.uid); // 方法打包抛出？
  }
  defineExpose(_expose);
</script>
