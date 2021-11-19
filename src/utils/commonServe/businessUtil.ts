/**
 * 业务相关的各种函数
 */
/**
 * 获取当前月第一天
 * @returns
 */
export function getFirstDayOfCurrentMonth() {
  const date = new Date();
  date.setDate(1);
  return date;
}
