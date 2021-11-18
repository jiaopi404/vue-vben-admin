export type LxPaginationActionType = {
  setTotal: (_total: number) => void;
  setCurrentPage: (_page: number, _pageSize?: number) => void;
};
