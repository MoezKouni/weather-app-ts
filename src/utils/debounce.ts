export const debounce = (fn: (...args) => void, delay: number) => {
  let timer: any;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
