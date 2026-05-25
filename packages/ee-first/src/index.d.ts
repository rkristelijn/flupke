declare function first(stuff: [any, ...string[]][], done: (err: null, ee: any, event: string, arg: any) => void): () => void;
export = first;
