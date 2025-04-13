/**
 * 所定の桁数をゼロ埋めした文字列を取得
 * @param id
 * @returns
 */
const getFormatedUserId = (id: number): string => {
  if (!id) return "";

  return `00000${id}`.substring(0, 6);
};

export { getFormatedUserId };
