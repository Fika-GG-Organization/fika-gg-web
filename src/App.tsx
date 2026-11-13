import AppRouter from './app/routes/AppRouter'
import { AuthProvider } from './app/auth/AuthProvider'
import { AppProvider } from './app/theme/ThemeProvider'
import { ToastProvider } from './app/toast'

function App() {
  return (
    <AppProvider>
			<ToastProvider>
      	<AuthProvider>
        	<AppRouter />
      	</AuthProvider>
			</ToastProvider>
    </AppProvider>
  )
}

export default App