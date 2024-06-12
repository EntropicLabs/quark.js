export { default as hub } from "./hub";
export { default as unifier } from "./unifier";
export { default as liquifier } from "./liquifier";

export type ExtractType<T> = T extends {
    [key: string]: {
        [contract: string]: infer U
    };
} ? U : never;
export type TypedRegistry<T> =
    Partial<Record<string, Partial<Record<string, T>>>>;