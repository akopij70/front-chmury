//Receive and save JWT token

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppActions from "src/AppActions";
import httpService from "src/httpService";

export function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    httpService.fetch({url: `/auth/callback?code=${code}`})
    .then(response => response.json())
    .then(data => {
      AppActions.setAuthToken(data.token);
      navigate('/chats', {replace: true});
      // navigate('/private', {replace: true});
    });
  }, []);
  return <div>
    Trying to log in...
  </div>
}
export default RedirectPage;