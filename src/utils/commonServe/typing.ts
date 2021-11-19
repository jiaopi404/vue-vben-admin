export interface CommonTree {
  id?: number;
  code?: string;
  name?: string;
  children: CommonTree[] | undefined;
  [key: string]: any;
}
