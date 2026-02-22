import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import lendsqrLogo from '@/assets/icons/lendsqr-logo.svg'
import loginIllustration from '@/assets/login-illustration.png'
import { FormInput } from '@/components/Form'
import { useAuth } from '@/context/AuthContext'
import './Login.scss'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('')
      await login(data.email, data.password)
      navigate('/users')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-page__hero">
        <div className="login-page__logo">
          <img src={lendsqrLogo} alt="Lendsqr Logo" />
        </div>
        <img src={loginIllustration} alt="Welcome" />
      </div>
      <div className="login-page__form-section">
        <div className="login-page__form-container">
          <h1 className="login-page__heading">Welcome!</h1>
          <p className="login-page__subheading">Enter details to login.</p>
          {error && <div className="login-page__error" role="alert">{error}</div>}
          <form className="login-page__form" onSubmit={handleSubmit(onSubmit)}>
            <FormInput<LoginFormData>
              name="email"
              control={control}
              placeholder="Email"
              type="email"
              required
            />
            <FormInput<LoginFormData>
              name="password"
              control={control}
              placeholder="Password"
              type="password"
              required
            />
            <p className="login-page__forgot-password">Forgot password?</p>
            <button type="submit" className="login-page__submit" disabled={isSubmitting}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
