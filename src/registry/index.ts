import { SetNonNullable, SetRequired, SimplifyDeep, UnionToIntersection } from "type-fest";

import { default as hubs } from "./hub";
import { default as unifiers } from "./unifier";
import { default as liquifiers } from "./liquifier";

function wrapRegistry<T, U extends Registry<T>>(registry: U): Registry<T> {
    return new Proxy(registry, {
        get: (target, prop: string) => {
            return target[prop] ?? {};
        }
    }) as Registry<T>;
}

export const HUBS = wrapRegistry(hubs as any) as typeof hubs;
export const UNIFIERS = wrapRegistry(unifiers as any) as typeof unifiers;
export const LIQUIFIERS = wrapRegistry(liquifiers as any) as typeof liquifiers;

export type ExtractType<T> = T extends {
    [key: string]: {
        [contract: string]: infer U
    };
} ? Dedupe<U> : never;

type LastOf<T> = UnionToIntersection<
    T extends any ? () => T : never> extends
    () => (infer R) ? R : never

type Dedupe<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
    true extends N ? never : Dedupe<Exclude<T, L>> | L;

type ContractList<T> = Partial<Record<string, ExtractType<T>>>;
export type Registry<T> = SimplifyDeep<Record<string, ContractList<T>>>;