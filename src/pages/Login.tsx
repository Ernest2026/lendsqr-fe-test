import { useNavigate } from 'react-router-dom'
import lendsqrLogo from '@/assets/icons/lendsqr-logo.svg'
import loginIllustration from '@/assets/login-illustration.png'
import './Login.scss'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/users')
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
          <form className="login-page__form" onSubmit={handleSubmit}>
            <input type="email" className="login-page__input" placeholder="Email" required />
            <input type="password" className="login-page__input" placeholder="Password" required />
            <p className="login-page__forgot-password">Forgot password?</p>
            <button type="submit" className="login-page__submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}
