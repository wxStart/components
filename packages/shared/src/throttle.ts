export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay = 500
) {
  let timeout: NodeJS.Timeout | null = null;
  return function () {
    // @ts-ignore
    const context: any = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        return fn.call(context, ...args);
      }, delay);
    }
  };
}
