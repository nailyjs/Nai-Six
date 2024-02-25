import type { VueInterceptor } from '@/decorators/intercept.decorator'
import type { LoginView } from '../Login.view'
import type { PipeErrorResponseType } from '@/validator/base'
import { AxiosError } from 'axios'
import { ZodError } from 'zod'

export class LoginSendCodeFilter implements VueInterceptor {
  public before(this: LoginView) {
    this.isLoginning = true
    this.isSendingCode = true
  }

  private static getErrorMessage(
    options: LoginView,
    error: AxiosError<PipeErrorResponseType> | ZodError
  ): string | undefined {
    if (error instanceof AxiosError) {
      if (error.response?.data.constraint === 'isNotEmpty') {
        return `${options.loginType === 'phone' ? '手机号' : '邮箱'}不能为空`
      } else if (error.response?.data.constraint === 'isMobilePhone') {
        return '手机号格式不正确'
      } else if (error.response?.data.constraint === 'isEmail') {
        return '邮箱格式不正确'
      }
    } else if (error instanceof ZodError) {
      return error.errors[0].message
    }
  }

  public catch(this: LoginView, error: AxiosError<PipeErrorResponseType> | ZodError) {
    if (error instanceof AxiosError) {
      const message = LoginSendCodeFilter.getErrorMessage(this, error)
      this.message.error(`发送验证码失败: ${message}`)
    }
  }

  public finally(this: LoginView) {
    this.isSendingCode = false
    this.isLoginning = false
  }
}

export class LoginFilter implements VueInterceptor {
  public before(this: LoginView) {
    this.isLoginning = true
  }

  public catch(this: LoginView, error: AxiosError<PipeErrorResponseType> | ZodError) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message) return this.message.error(error.response?.data.message)
    }
  }

  public finally(this: LoginView) {
    this.isLoginning = false
  }
}
