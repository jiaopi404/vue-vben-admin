<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="warning" @click="handleCreate"> new Dep </a-button>
      </template>
    </BasicTable>
    <!-- <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" /> -->
    <LxPagination ref="lxPagination" @change="pageChangeHandler" />
  </div>
</template>
<script lang="ts" setup>
  import { h, onMounted, ref } from 'vue';
  import { columns } from './dept.data';
  // import { useModal } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeptList } from '/@/api/demo/system';
  import { LxPagination, LxPaginationActionType } from '/@/components/LxComponents';
  import { DeptListGetResultModel } from '/@/api/demo/model/systemModel';

  // state
  const lxPagination = ref<LxPaginationActionType>();

  // use table
  const [registerTable, { reload, setTableData }] = useTable({
    title: 'dep list',
    // api: getDeptList, // not this
    columns,
    // formConfig: {}, // not this
    pagination: false, // no pagination
    striped: false,
    useSearchForm: true, // false, no
    showTableSetting: true,
    canResize: false,
    actionColumn: {
      width: 80,
      title: 'action',
      dataIndex: 'action',
      slots: {
        customRender: () => h('div', { class: 'ssd' }),
      },
      fixed: 'right',
    },
  });

  // use model
  // const [registerModal, { openModal }] = useModal();

  // life cycles
  onMounted(async () => {
    // 1. getData
    const _tableData: DeptListGetResultModel = await getDeptList({
      id: '',
      orderNo: '',
      createTime: '',
      remark: '',
      status: 10,
    }); // api
    console.log('🚀 ~ file: index.vue ~ line 70 ~ onMounted ~ _tableData', _tableData);
    setTableData(_tableData.items);
    // 设置 total
    debugger;
    lxPagination.value && lxPagination.value.setTotal(20);
  });

  // methods
  const pageChangeHandler = (...args) => {
    console.log('pageChangeHandler, args are: ', args);
    reload();
  };
  // function handleCreate() {
  //   console.log('gonna open the create modal: ', 111);
  //   openModal(true, {
  //     isUpdate: false,
  //   });
  // }
</script>
<script lang="ts">
  // import { defineComponent } from 'vue';

  // import { BasicTable, useTable, TableAction } from '/@/components/Table';
  // import { getDeptList } from '/@/api/demo/system';

  // import { useModal } from '/@/components/Modal';
  // import DeptModal from './DeptModal.vue';

  // import { columns, searchFormSchema } from './dept.data';

  // export default defineComponent({
  //   name: 'DeptManagement',
  //   components: { BasicTable, DeptModal, TableAction },
  //   setup() {
  //     const [registerModal, { openModal }] = useModal();
  //     const [registerTable, { reload }] = useTable({
  //       title: '部门列表',
  //       api: getDeptList,
  //       columns,
  //       formConfig: {
  //         labelWidth: 120,
  //         schemas: searchFormSchema,
  //       },
  //       pagination: false,
  //       striped: false,
  //       useSearchForm: true,
  //       showTableSetting: true,
  //       bordered: true,
  //       showIndexColumn: false,
  //       canResize: false,
  //       actionColumn: {
  //         width: 80,
  //         title: '操作',
  //         dataIndex: 'action',
  //         slots: { customRender: 'action' },
  //         fixed: undefined,
  //       },
  //     });

  //     function handleCreate() {
  //       openModal(true, {
  //         isUpdate: false,
  //       });
  //     }

  //     function handleEdit(record: Recordable) {
  //       openModal(true, {
  //         record,
  //         isUpdate: true,
  //       });
  //     }

  //     function handleDelete(record: Recordable) {
  //       console.log(record);
  //     }

  //     function handleSuccess() {
  //       reload();
  //     }

  //     return {
  //       registerTable,
  //       registerModal,
  //       handleCreate,
  //       handleEdit,
  //       handleDelete,
  //       handleSuccess,
  //     };
  //   },
  // });
</script>
