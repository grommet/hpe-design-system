/// <reference types="vite/client" />

declare module "ms" {
  function ms(value: string | number): number | string;
  export = ms;
}
