import { createDecorator } from 'vue-facing-decorator'

export interface VueInterceptor {
  /**
   * 前置拦截
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/24
   * @param {Record<string, any>} this
   * @return {*}
   * @memberof VueInterceptor
   */
  before?(this: Record<string, any>): any
  /**
   * 后置拦截
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/24
   * @param {Record<string, any>} this
   * @return {*}
   * @memberof VueInterceptor
   */
  after?(this: Record<string, any>): any
  /**
   * 异常拦截
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/24
   * @param {Record<string, any>} this
   * @param {*} error
   * @return {*}
   * @memberof VueInterceptor
   */
  catch?(this: Record<string, any>, error: any): any
  /**
   * 最终拦截
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/24
   * @param {Record<string, any>} this
   * @return {*}
   * @memberof VueInterceptor
   */
  finally?(this: Record<string, any>): any
}

/**
 * 切面拦截器
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/02/24
 * @export
 * @param {...VueInterceptor[]} filters 拦截过滤器
 * @return {MethodDecorator}
 */
export function Intercept(...filters: VueInterceptor[]): MethodDecorator
export function Intercept(...filters: VueInterceptor[]) {
  return createDecorator(
    (options, key) => {
      const old: Function = options.methods[key]
      options.methods[key] = async function (...args: any[]) {
        try {
          for (const filter of filters) {
            if (filter.before) {
              await filter.before.call(this)
            }
          }
          const value = await old.call(this, ...args)
          for (const filter of filters) {
            if (filter.after) {
              await filter.after.call(this)
            }
          }
          return value
        } catch (error) {
          for (const filter of filters) {
            if (filter.catch) {
              const result = filter.catch.call(this, error)
              if (result) return result
            }
          }
        } finally {
          for (const filter of filters) {
            if (filter.finally) {
              await filter.finally.call(this)
            }
          }
        }
      }
    },
    { preserve: true }
  ) as MethodDecorator
}
