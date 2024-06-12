export { default as hub } from "./hub";
export { default as unifier } from "./unifier";
export { default as liquifier } from "./liquifier";

type ExtractType<T> = T extends {
    [key: string]: {
        [contract: string]: infer U
    };
} ? U : never;
export type TypedRegistry<T> = {
    [network: string]: {
        [contract: string]: ExtractType<T>
    }
};