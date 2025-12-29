
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 500) {
  let timeout: NodeJS.Timeout | null = null
  return function () {
    // @ts-ignore
    const context: any = this
    const args = arguments
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      return fn.call(context, ...args)
    }, delay)
  }
}