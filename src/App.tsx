import "shared/lib/dates";
import AppRouter from './app/routes/AppRouter'
import { AuthProvider } from './app/auth/AuthProvider'
import { AppProvider } from './app/theme/ThemeProvider'

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppProvider>
  )
}

export default App