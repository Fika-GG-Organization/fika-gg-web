import AppRouter from './app/routes/AppRouter'
import { AuthProvider } from './app/auth/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App