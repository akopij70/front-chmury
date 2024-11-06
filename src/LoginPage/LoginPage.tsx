import { useEffect, useState } from "react";
import httpService from "src/httpService";

export function LoginPage() {
  const [cognitoUrl, setCognitoUrl] = useState("");
  useEffect(() => {
    httpService.fetch({url: '/auth/url'})
    .then(response => response.json())
    .then(data => {
      setCognitoUrl(data.url);
    })
  }, []);

  return <div className="centered-list">
    <button onClick={() => window.location.href = cognitoUrl}>Log in</button>
  </div>
}
export default LoginPage;