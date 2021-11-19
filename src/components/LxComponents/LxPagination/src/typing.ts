export type LxPageChangeCb = (_page: number, _pageSize: number) => void | Promise<void>;

export type LxPaginationActionType = {
  setTotal: (_total: number) => void;
  setCurrentPage: (_page: number, _pageSize?: number) => void;
  doAfterPageChange: (cb: LxPageChangeCb) => void;
};

export type UseLxPaginationRegisterFn = (instance: LxPaginationActionType, uuid: string) => void;

export type UseLxPaginationReturnType = [UseLxPaginationRegisterFn, LxPaginationActionType];
