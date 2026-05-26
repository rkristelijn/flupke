declare function classnames(
  ...args: (
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, boolean>
    | (string | number | boolean | null | undefined | Record<string, boolean>)[]
  )[]
): string;
export = classnames;
