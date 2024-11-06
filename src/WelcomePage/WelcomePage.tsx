import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpService from "src/httpService";


export function WelcomePage() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  useEffect(() => {
    httpService.fetch({url: '/public'})
        .then(response => response.json())
        .then(data => {
            setContent(data.message);
            setShowSpinner(false);
        });
}, []);


  return <div>
      <p> Are you ready? </p>
      <div className="centered-list">
        <button onClick={() => navigate('/login')}>Let's go</button>
      </div>
      {/* <div> Backend: {content} </div>  */}
    </div> 
}
export default WelcomePage;