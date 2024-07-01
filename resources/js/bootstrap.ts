import axios from 'axios';
import { useAuth } from './Hooks/useAuth';
import { toast } from './Components/ui/use-toast';

declare global {
  interface Window {
    axios: typeof axios;
  }
}

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401: // Not logged in
        toast({
          variant: 'destructive',
          title: 'Error: 401 Unauthorized',
          description: 'You are not logged in.  Please log in to continue.',
        })

        useAuth.getState().logout();

        window.location.href = "/";

        return null        
        // return Promise.reject(error);
        break;
      case 419: // Session expired
        // Bounce the user to the login screen with a redirect back
        // window.location.href = '/login?redirectTo=' + encodeURIComponent(window.location.pathname);
        // window.location.href = '/session-expired';
        // redirect('/');

        break;
      case 503: // Down for maintenance
        // Bounce the user to the login screen with a redirect back
        // window.location.reload();
        break;
      case 500:
        // shows error message from server
        toast({
          title: 'Server Error',
          description: error.response.data.message,
          variant: 'destructive',
        });
        break;
      default:
        // Allow individual requests to handle other errors
        return Promise.reject(error);
    }
  }

  // End of axios setup
);
