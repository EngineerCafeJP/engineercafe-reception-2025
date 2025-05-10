/**
 * 所定の桁数（６桁）をゼロ埋めした文字列を取得
 * @param id
 * @returns ゼロ埋めした文字列
 */
const getFormatedUserId = (id: number): string => {
  if (!id) return "";

  return `00000${id}`.substring(0, 6);
};

export { getFormatedUserId };
