<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, ref, onMounted, useAttrs } from 'vue';
  import { formSchema } from './menu.data';
  import { getMenuList } from '/@/api/demo/system';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Modal } from 'ant-design-vue';

  const isUpdate = ref<boolean>(true); // wether it is update
  const attrs = useAttrs();

  onMounted(() => {
    console.log('attrs are: ', attrs);
  });

  const emit = defineEmits(['success', 'register']);
  // form
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });
  // drawer inner
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (isUpdate.value) {
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getMenuList();
    updateSchema({
      field: 'parentMenu',
      componentProps: { treeData },
    });
  });
  // confirm
  const { createConfirm, createConfirmPromise } = useMessage();
  const getTitle = computed(() => (!isUpdate.value ? 'new menu' : 'update menu'));
  const handleSubmit = async () => {
    // TODO: 确认删除
    // const confrimModel = createConfirm({
    //   iconType: 'warning',
    //   title: 'this is Tips',
    //   content: 'are you sure you want to save?',
    //   onOk: () => {
    //     return async () => {
    //       setTimeout(() => {});
    //     };
    //   },
    // });
    // confrimModel.success({});
    await createConfirmPromise(
      {
        iconType: 'warning',
        title: 'this is tips',
        content: 'are you sure you want to save',
      },
      async () => {
        await someAwaitFunctions();
      },
    );
    console.log('看看这个什么时候运行呢?');
    // try {
    //   const values = await validate();
    //   setDrawerProps({ confirmLoading: true });
    //   // TODO: custom api
    //   console.log('🚀 ~ file: MenuDrawer.vue ~ line 47 ~ handleSubmit ~ values', values);
    //   closeDrawer();
    //   emit('success');
    // } catch (err) {
    //   console.log('ERROE OCCURED!', err);
    // } finally {
    //   setDrawerProps({ confirmLoading: false });
    // }
  };
  function setTimeoutPromise(milisecond = 3000) {
    return new Promise<void>((resolve) => {
      // 我隔这直接关掉
      // Modal.destroyAll(); // 可以运行，没问题
      setTimeout(() => {
        console.log('i am done:', milisecond);
        resolve();
      }, milisecond);
    });
  }
  async function someAwaitFunctions() {
    await setTimeoutPromise(100);
    await setTimeoutPromise(200);
    await setTimeoutPromise(300);
    await setTimeoutPromise();
  }
</script>
<script lang="ts">
  // import { defineComponent, ref, computed, unref } from 'vue';
  // import { BasicForm, useForm } from '/@/components/Form/index';
  // import { formSchema } from './menu.data';
  // import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  // import { getMenuList } from '/@/api/demo/system';

  // export default defineComponent({
  //   name: 'MenuDrawer',
  //   components: { BasicDrawer, BasicForm },
  //   emits: ['success', 'register'],
  //   setup(_, { emit }) {
  //     const isUpdate = ref(true);

  //     const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
  //       labelWidth: 100,
  //       schemas: formSchema,
  //       showActionButtonGroup: false,
  //       baseColProps: { lg: 12, md: 24 },
  //     });

  //     const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  //       resetFields();
  //       setDrawerProps({ confirmLoading: false });
  //       isUpdate.value = !!data?.isUpdate;

  //       if (unref(isUpdate)) {
  //         setFieldsValue({
  //           ...data.record,
  //         });
  //       }
  //       const treeData = await getMenuList();
  //       updateSchema({
  //         field: 'parentMenu',
  //         componentProps: { treeData },
  //       });
  //     });

  //     const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  //     async function handleSubmit() {
  //       try {
  //         const values = await validate();
  //         setDrawerProps({ confirmLoading: true });
  //         // TODO custom api
  //         console.log(values);
  //         closeDrawer();
  //         emit('success');
  //       } finally {
  //         setDrawerProps({ confirmLoading: false });
  //       }
  //     }

  //     return { registerDrawer, registerForm, getTitle, handleSubmit };
  //   },
  // });
</script>
