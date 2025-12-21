import * as Prisma from '@infoportal/prisma'

export type Brand<K, T> = K & {
  /** @deprecated Should never be used: compile-time only trick to distinguish different ID types. */
  __brand: T
}

export enum StateStatus {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
  disabled = 'disabled',
}

export type BulkResponse<ID extends string> = {id: ID; status: 'success'}[]

export type Uuid = Brand<string, 'Uuid'>

export type Geolocation = [number, number]

export type Period = {
  start: Date
  end: Date
}

export type Pagination = {
  offset?: number
  limit?: number
}

export type Paginate<T> = {
  total: number
  data: T[]
}

export namespace Paginate {
  export const map =
    <T, R>(fn: (_: T) => R) =>
    (paginated: Paginate<T>): Paginate<R> => {
      return {
        ...paginated,
        data: paginated.data.map(fn),
      }
    }

  export const wrap =
    (totalSize?: number) =>
    <T>(data: T[]): Paginate<T> => {
      return {
        data,
        total: totalSize ?? data.length,
      }
    }

  export const make =
    (limit?: number, offset: number = 0) =>
    <T>(data: T[]): Paginate<T> => {
      return {
        data: limit || offset ? data.slice(offset, offset + (limit ?? data.length)) : data,
        total: data.length,
      }
    }
}

export type AccessLevel = Prisma.AccessLevel
export const AccessLevel = {
  Read: 'Read',
  Write: 'Write',
  Admin: 'Admin',
} as const
