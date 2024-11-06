import { useEffect, useState } from "react";
import httpService from "src/httpService";

export function ProtectPage() {

  const [content, setContent] = useState("");
  useEffect(() => {
    httpService.fetchWithAuth({url: '/private'})
    .then(response => response.json())
    .then(data => {
      setContent(data.message);
    })
  }, []);

  return <div>
    <div>Protected chats</div>
    <div>From server: {content}</div>
  </div>
}
export default ProtectPage;