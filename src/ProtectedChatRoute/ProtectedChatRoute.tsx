import { Navigate, Outlet } from 'react-router-dom';
import AppStore from 'src/AppStore';

// Komponent ochrony
function ProtectedRoute() {
  if (!AppStore.authToken) {
    // Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania
    return <Navigate to="/login" replace />;
  }

  // Jeśli użytkownik jest zalogowany, renderuj komponenty
  return <Outlet />;
}

export default ProtectedRoute;