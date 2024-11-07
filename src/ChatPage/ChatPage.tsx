import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import AppStore from "src/AppStore";
import { useNavigate } from "react-router-dom";
import httpService from "src/httpService";
import { Message } from "src/types";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ [user: string]: Message[] }>({});
  const [message, setMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<string>("");
  const [allUsers, setAllUsers] = useState<{ id: number; username: string }[]>([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [stompClient, username]);

  useEffect(() => {
    httpService.fetchWithAuth({url: '/private'})
    .then(response => {
      if (!response.ok) {
        throw new Error('Unauthorized or other error');
      }
      return response.json();
    })
    .then(data => {
      setUsername(data.message);
    })
    .catch(error => {
      console.error('Error fetching private data:', error);
      navigate('/');
    });
    fetchAllUsers();    
  }, []);

  useEffect(() => {
    const token = AppStore.authToken;
    const socket = new SockJS(`http://localhost:8080/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      beforeConnect: () => {
        client.connectHeaders = {
          Authorization: `Bearer ${token}`,
        };
      },
      onConnect: () => {
        console.log("Connected to WebSocket as ", username);
        
        client.publish({
          destination: "/app/connect-user",
          body: username,
        });  
        
        client.subscribe(`/topic/users`, (message) => {
          console.log("Odebrano listę użytkowników:", message.body);
          const usersList: string[] = JSON.parse(message.body);
          setConnectedUsers([...usersList.filter((user) => user !== username)]);;
        });
        
        client.subscribe(`/user/${username}/private`, (message) => {
          const receivedMessage: Message = JSON.parse(message.body);
          setMessages((prevMessages) => ({
            ...prevMessages,
            [receivedMessage.senderName]: [
              ...(prevMessages[receivedMessage.senderName] || []),
              receivedMessage,
            ],
          }));
        });
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers["message"]}`);
        console.error(`Additional details: ${frame.body}`);
        navigate("/login");
        return;
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };

  }, [username, allUsers])

  const fetchAllUsers = async () => {
    try {
      const response = await httpService.fetch({
        url: "/all-users",
        options: {
          method: "GET",
        },
      });
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const sendMessage = () => {
    if (stompClient && message && selectedChatUser) {
      const chatMessage: Message = {
        senderName: username, 
        recipientName: selectedChatUser,
        message: message,
      };

      stompClient.publish({
        destination: "/app/private-message",
        body: JSON.stringify(chatMessage),
      });

      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChatUser]: [
          ...(prevMessages[selectedChatUser] || []),
          chatMessage,
        ],
      }));

      setMessage("");
    }
  };

  const disconnectAndLogout = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/disconnect-user",
        body: username,
      });
      stompClient.deactivate();
      AppStore.authToken = "";
      navigate("/");
    }
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (stompClient && username) {
      stompClient.publish({
        destination: "/app/disconnect-user",
        body: username,
      });
      stompClient.deactivate();
    }

    event.returnValue = "Czy na pewno chcesz opuścić stronę?";
  };

  return (
    <div>
      <div>
        Hello: {username}
      <h2>All Users using this app:</h2>
      {allUsers.length > 0 ? (
        <ul>
          {allUsers.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users in database</p>
      )}
    </div>

      <div>
        <h3>Active users:</h3>
        {connectedUsers.length > 0 ? (
          <ul>
            {connectedUsers.map((user, index) => (
              <li
                key={index}
                onClick={() => setSelectedChatUser(user)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedChatUser === user ? "bold" : "normal",
                }}
              >
                {user}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users connected</p>
        )}
      </div>

      <div>
        <h3>Chat with {selectedChatUser || "..."}</h3>
        {selectedChatUser && messages[selectedChatUser] ? (
          messages[selectedChatUser].map((msg, index) => (
            <div key={index}>
              <strong>{msg.senderName}</strong>: {msg.message}
            </div>
          ))
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>

      {selectedChatUser && (
        <div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${selectedChatUser}...`}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
      <div>
        <button onClick={disconnectAndLogout}>Disconnect</button>
      </div>
    </div>
  );
};

export default ChatPage;
