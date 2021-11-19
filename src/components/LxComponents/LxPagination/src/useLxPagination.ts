import { tryOnUnmounted } from '@vueuse/core';
import { isProdMode } from '/@/utils/env';
import { ref, unref, getCurrentInstance } from 'vue';
import {
  LxPaginationActionType,
  LxPageChangeCb,
  UseLxPaginationRegisterFn,
  UseLxPaginationReturnType,
} from './typing';
import { error } from '/@/utils/log';

export function useLxPagination(): UseLxPaginationReturnType {
  // 内部维护变量
  const lxPaginationRef = ref<Nullable<LxPaginationActionType>>(null);
  const currentInstance = getCurrentInstance(); // 看有无效果？
  const uidRef = ref<string>('');

  const register: UseLxPaginationRegisterFn = (
    lxPaginationInstance: LxPaginationActionType,
    uuid: string,
  ) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        lxPaginationRef.value = null;
      });
    uidRef.value = uuid;
    lxPaginationRef.value = lxPaginationInstance;
    currentInstance?.emit('register', lxPaginationInstance, uuid);
  };

  const getInstance = () => {
    const instance = unref(lxPaginationRef);
    if (!instance) {
      error('useLxPagination instance is undefined!');
    }
    return instance;
  };
  // return {
  //   register,
  //   lxPaginationAction: {
  //     setTotal: (_total: number) => {
  //       getInstance()?.setTotal(_total);
  //     },
  //     setCurrentPage: (_page, _pageSize?: number) => {
  //       getInstance()?.setCurrentPage(_page, _pageSize);
  //     },
  //     doAfterPageChange: (cb: LxPageChangeCb) => {
  //       getInstance()?.doAfterPageChange(cb);
  //     },
  //   } as LxPaginationActionType,
  // };
  return [
    register,
    {
      setTotal: (_total: number) => {
        getInstance()?.setTotal(_total);
      },
      setCurrentPage: (_page, _pageSize?: number) => {
        getInstance()?.setCurrentPage(_page, _pageSize);
      },
      doAfterPageChange: (cb: LxPageChangeCb) => {
        getInstance()?.doAfterPageChange(cb);
      },
    } as LxPaginationActionType,
  ];
}
