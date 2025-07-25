export async function sleep(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}
