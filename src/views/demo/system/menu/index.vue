<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { getMenuList } from '/@/api/demo/system';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { columns, searchFormSchema } from './menu.data';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, expandAll }] = useTable({
    title: 'my menu list: ',
    api: getMenuList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined, // 默认不
    },
  });

  // create new menu
  const handleCreate = () => {
    openDrawer(true, {
      isUpdate: false,
    });
  };
  // edit menu
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  };
  // delete menu
  const handleDelete = (record: Recordable) => {
    console.log('🚀 ~ file: index.vue ~ line 81 ~ handleDelete ~ record', record);
  };
  // action, success
  const handleSuccess = () => {
    reload();
  };
  // action fetch success, fetch data success handler
  const onFetchSuccess = () => {
    // default expand all
    nextTick(expandAll);
  };
</script>
<script lang="ts">
  // import { defineComponent, nextTick } from 'vue';

  // import { BasicTable, useTable, TableAction } from '/@/components/Table';
  // import { getMenuList } from '/@/api/demo/system';

  // import { useDrawer } from '/@/components/Drawer';
  // import MenuDrawer from './MenuDrawer.vue';

  // import { columns, searchFormSchema } from './menu.data';

  // export default defineComponent({
  //   name: 'MenuManagement',
  //   components: { BasicTable, MenuDrawer, TableAction },
  //   setup() {
  //     const [registerDrawer, { openDrawer }] = useDrawer();
  //     const [registerTable, { reload, expandAll }] = useTable({
  //       title: '菜单列表',
  //       api: getMenuList,
  //       columns,
  //       formConfig: {
  //         labelWidth: 120,
  //         schemas: searchFormSchema,
  //       },
  //       isTreeTable: true,
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
  //       openDrawer(true, {
  //         isUpdate: false,
  //       });
  //     }

  //     function handleEdit(record: Recordable) {
  //       openDrawer(true, {
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

  //     function onFetchSuccess() {
  //       // 演示默认展开所有表项
  //       nextTick(expandAll);
  //     }

  //     return {
  //       registerTable,
  //       registerDrawer,
  //       handleCreate,
  //       handleEdit,
  //       handleDelete,
  //       handleSuccess,
  //       onFetchSuccess,
  //     };
  //   },
  // });
</script>
