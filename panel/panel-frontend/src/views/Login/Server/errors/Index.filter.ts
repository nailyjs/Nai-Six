import type { VueInterceptor } from '@/decorators/intercept.decorator'
import type { ServerView } from '../Index.view'
import { AxiosError } from 'axios'
import { ZodError } from 'zod'

export class AutoCompleteFilter implements VueInterceptor {
  before(this: ServerView) {
    this.isFinding = true
  }

  catch(this: ServerView, error: Error) {
    console.error(error)
    if (error instanceof AxiosError) {
      return this.message.error(`面板请求失败 请检查地址是否正确: ${error.message}`)
    } else if (error instanceof ZodError) {
      return this.message.error(`面板返回数据不符合预期: ${error.message}`)
    } else {
      return this.message.error('未知错误')
    }
  }

  finally(this: ServerView) {
    this.isFinding = false
  }
}
