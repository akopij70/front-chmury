// // import { useEffect, useState } from "react";
// // import SockJS from 'sockjs-client';        // Still use sockjs-client for SockJS
// // import { Client } from '@stomp/stompjs';   // Import Client from @stomp/stompjs
// // import AppStore from "src/AppStore";        // Import AppStore for the JWT token

// // // Define your message type
// // interface Message {
// //   senderName: string;
// //   content: string;
// // }

// // export function ChatPage() {
// //   const [publicMessages, setPublicMessages] = useState<Message[]>([]);
// //   const [privateMessages, setPrivateMessages] = useState<Message[]>([]);

// //   // Initialize the WebSocket connection when the component mounts
// //   useEffect(() => {
// //     const socket = new SockJS('http://localhost:8080/ws');
// //     const stompClient = new Client({
// //       webSocketFactory: () => socket as WebSocket, // Cast SockJS as WebSocket
// //       reconnectDelay: 5000,  // Reconnect after 5 seconds if the connection is lost
// //       debug: (str) => {
// //         console.log(str);    // Log debugging information
// //       },
// //       connectHeaders: {
// //         Authorization: `Bearer ${AppStore.authToken}`
// //       }
// //     });

// //     stompClient.onConnect = (frame) => {
// //       console.log('Connected: ' + frame);

// //       // Subscribe to public chat messages
// //       stompClient.subscribe('/chatroom/public', (message) => {
// //         const parsedMessage = JSON.parse(message.body);
// //         setPublicMessages((prevMessages) => [...prevMessages, parsedMessage]);
// //       });

// //       // Subscribe to private messages for the logged-in user
// //       const username = AppStore.authToken ? decodeToken(AppStore.authToken).sub : null;
// //       if (username) {
// //         stompClient.subscribe(`/user/${username}/private`, (message) => {
// //           const parsedMessage = JSON.parse(message.body);
// //           setPrivateMessages((prevMessages) => [...prevMessages, parsedMessage]);
// //         });
// //       }
// //     };

// //     stompClient.activate();

// //     // Cleanup on component unmount
// //     return () => {
// //       if (stompClient) {
// //         stompClient.deactivate();
// //       }
// //     };
// //   }, []);

// //   // Helper function to decode JWT token (if needed)
// //   const decodeToken = (token: string) => {
// //     try {
// //       return JSON.parse(atob(token.split('.')[1]));
// //     } catch (error) {
// //       console.error("Error decoding token", error);
// //       return null;
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Public Chat</h2>
// //       <div>
// //         {publicMessages.map((message, index) => (
// //           <div key={index}>
// //             <strong>{message.senderName}:</strong> {message.content}
// //           </div>
// //         ))}
// //       </div>

// //       <h2>Private Chat</h2>
// //       <div>
// //         {privateMessages.map((message, index) => (
// //           <div key={index}>
// //             <strong>{message.senderName} (Private):</strong> {message.content}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatPage;

// // import { useEffect, useRef, useState } from "react";
// // import SockJS from 'sockjs-client';
// // import { Client } from '@stomp/stompjs';
// // import AppStore from "src/AppStore"; // Ensure you have an auth token

// // interface Message {
// //     senderName: string;
// //     recipientName?: string; // Optional for public messages
// //     content: string;
// // }

// // export function ChatPage() {
  
// //     const [publicMessages, setPublicMessages] = useState<Message[]>([]);
//     // const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
//     // const [messageInput, setMessageInput] = useState<string>("");
//     // const [recipientInput, setRecipientInput] = useState<string>("");
//     // const stompClient = useRef<Client | null>(null); // Use useRef to hold stompClient
//     // const [isConnected, setIsConnected] = useState<boolean>(false); // Connection status

//     // useEffect(() => {
//     //   // var socket = new SockJS("http://localhost:1981/ws");
//     //   // stompClient = Stomp.over(socket);

//     //   // stompClient.connect({}, this.onConnected, this.onError);
//     //   console.log(`JWT Token: ${AppStore.authToken}`);
//     //   // const socket = new SockJS('http://localhost:8080/ws');
//     //   console.log("witam");
//     //   stompClient.current = new Client({
//     //     webSocketFactory: () => socket as WebSocket,
//     //     debug: (str) => console.log(str),
//     //     connectHeaders: {
//     //       Authorization: `Bearer ${AppStore.authToken}`
//     //     },
//     //     reconnectDelay: 5000,
//     //     onConnect: (frame) => {
//     //       console.log('Connected: ' + frame);
//     //       setIsConnected(true);
//     //       console.log(isConnected);
//     //       stompClient.current?.subscribe('/chatroom/public', (message) => {
//     //         const parsedMessage = JSON.parse(message.body);
//     //         setPublicMessages((prevMessages) => [...prevMessages, parsedMessage]);
//     //       });
//     //     }
//     //   })
//     // })

//     // useEffect(() => {
//     //     const socket = new SockJS('http://localhost:8080/ws');
//     //     stompClient.current = new Client({
//     //         webSocketFactory: () => socket as WebSocket,
//     //         debug: (str) => console.log(str),
//     //         connectHeaders: {
//     //             Authorization: `Bearer ${AppStore.authToken}` // JWT token for auth
//     //         },
//     //         reconnectDelay: 5000,
//     //         onConnect: (frame) => {
//     //             console.log('Connected: ' + frame);
//     //             setIsConnected(true); // Set connection status to true

//     //             // Subscribe to public chat messages
//     //             stompClient.current?.subscribe('/chatroom/public', (message) => {
//     //                 const parsedMessage = JSON.parse(message.body);
//     //                 setPublicMessages((prevMessages) => [...prevMessages, parsedMessage]);
//     //             });

//     //             // Subscribe to private messages
//     //             const username = AppStore.authToken ? decodeToken(AppStore.authToken).sub : null;
//     //             if (username) {
//     //                 stompClient.current?.subscribe(`/user/${username}/private`, (message) => {
//     //                     const parsedMessage = JSON.parse(message.body);
//     //                     setPrivateMessages((prevMessages) => [...prevMessages, parsedMessage]);
//     //                 });
//     //             }
//     //         },
//     //         onStompError: (frame) => {
//     //             console.error('Broker reported error: ' + frame.headers['message']);
//     //             console.error('Additional details: ' + frame.body);
//     //             setIsConnected(false); // Set connection status to false
//     //         }
//     //     });

//     //     stompClient.current.activate(); // Activate the stomp client

//     //     return () => {
//     //         stompClient.current?.deactivate(); // Cleanup on unmount
//     //     };
//     // }, []);

//     // const sendPublicMessage = () => {
//     //     if (!isConnected) {
//     //         console.error("Cannot send message, not connected to STOMP broker.");
//     //         return;
//     //     }
//     //     const message: Message = {
//     //         senderName: AppStore.authToken ? decodeToken(AppStore.authToken).sub : "",
//     //         content: messageInput,
//     //     };
//     //     stompClient.current?.publish({ destination: '/app/public-message', body: JSON.stringify(message) });
//     //     setMessageInput("");
//     // };

//     // const sendPrivateMessage = () => {
//     //     if (!isConnected) {
//     //         console.error("Cannot send message, not connected to STOMP broker.");
//     //         return;
//     //     }
//     //     const message: Message = {
//     //         senderName: AppStore.authToken ? decodeToken(AppStore.authToken).sub : "",
//     //         recipientName: recipientInput,
//     //         content: messageInput,
//     //     };
//     //     stompClient.current?.publish({ destination: '/app/private-message', body: JSON.stringify(message) });
//     //     setMessageInput("");
//     // };

//     // return <div>siema</div>;

//     // return (
//     //     <div>
//     //         <h2>Public Chat</h2>
//     //         <div>
//     //             {publicMessages.map((message, index) => (
//     //                 <div key={index}>
//     //                     <strong>{message.senderName}:</strong> {message.content}
//     //                 </div>
//     //             ))}
//     //         </div>

//     //         <h2>Private Chat</h2>
//     //         <div>
//     //             {privateMessages.map((message, index) => (
//     //                 <div key={index}>
//     //                     <strong>{message.senderName} (Private):</strong> {message.content}
//     //                 </div>
//     //             ))}
//     //         </div>

//     //         <input
//     //             type="text"
//     //             value={messageInput}
//     //             onChange={(e) => setMessageInput(e.target.value)}
//     //             placeholder="Type a message"
//     //         />
//     //         <button onClick={sendPublicMessage}>Send to Public</button>

//     //         <input
//     //             type="text"
//     //             value={recipientInput}
//     //             onChange={(e) => setRecipientInput(e.target.value)}
//     //             placeholder="Recipient for Private Message"
//     //         />
//     //         <button onClick={sendPrivateMessage}>Send to Private</button>
//     //     </div>
//     // );
// // }

// // Helper function to decode JWT token (if needed)
// // const decodeToken = (token: string) => {
// //     try {
// //         return JSON.parse(atob(token.split('.')[1]));
// //     } catch (error) {
// //         console.error("Error decoding token", error);
// //         return null;
// //     }
// // };



// import React, { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import AppStore from "src/AppStore";
// import jwt from 'jsonwebtoken';
// import { JwtPayload } from "jsonwebtoken";



// const ChatPage = () => {
//   const [messages, setMessages] = useState<Array<{ sender: string, content: string, timestamp: string }>>([]);
//   const [message, setMessage] = useState("");
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//   const [username, setUsername] = useState("");
//   console.log("Auth token:", AppStore.authToken); 
//   console.log("SIE");


//   useEffect(() => {
//     // console.log("Auth token:", AppStore.authToken); 

//     // if (!AppStore.authToken) {
//       // console.error("Token JWT nie jest dostępny.");
//       // return;
//     // }
//     // setUsername
//     // Przekazywanie tokena JWT jako parametru w URL
//     const socket = new SockJS(`http://localhost:8080/ws`);
//     // const socket = new SockJS(`http://localhost:8080/ws?token=${AppStore.authToken}`);
//     const client = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       debug: (str) => {
//         console.log(str);
//       },
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Subskrybuj wiadomości
//         client.subscribe("/topic/messages", (message) => {
//           const receivedMessage = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         });
//       },
//       onStompError: (frame) => {
//         console.error(`Broker reported error: ${frame.headers["message"]}`);
//         console.error(`Additional details: ${frame.body}`);
//       },
//     });

//     client.activate();
//     setStompClient(client);

//     return () => {
//       if (client) client.deactivate();
//     };
//   }, []);

//   // useEffect(() => {
//   //   if (!AppStore.authToken) {
//   //     console.error("Token JWT nie jest dostępny.");
//   //     return;
//   //   }
  
//   //   const client = new Client({
//   //     brokerURL: `ws://localhost:8080/ws?token=${AppStore.authToken}`, // Używamy natywnego WebSocket zamiast SockJS
//   //     connectHeaders: {
//   //       Authorization: `Bearer ${AppStore.authToken}`,
//   //     },
//   //     reconnectDelay: 5000,
//   //     debug: (str) => {
//   //       console.log(str);
//   //     },
//   //     onConnect: () => {
//   //       console.log("Connected to WebSocket");
  
//   //       client.subscribe("/topic/messages", (message) => {
//   //         const receivedMessage = JSON.parse(message.body);
//   //         setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//   //       });
//   //     },
//   //     onStompError: (frame) => {
//   //       console.error(`Broker reported error: ${frame.headers["message"]}`);
//   //       console.error(`Additional details: ${frame.body}`);
//   //     },
//   //   });
  
//   //   client.activate();
//   //   setStompClient(client);
  
//   //   return () => {
//   //     if (client) client.deactivate();
//   //   };
//   // }, []);

//   // const decodeUsernameFromToken = (token) => {
//   //   try {
//   //     const decoded: any  = jwt.decode(token);
//   //     if (decoded && (decoded. || decoded.sub)) {
//   //       return decoded.username || decoded.sub;
//   //     } else {
//   //       throw new Error('Username not found in token');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error decoding token:', error);
//   //     return null;
//   //   }
//   // };

//   const sendMessage = () => {
//     if (stompClient && message) {
//       const chatMessage = {
//         sender: username,
//         content: message,
//         timestamp: new Date().toISOString(),
//       };
//       stompClient.publish({
//         destination: "/app/sendMessage",
//         body: JSON.stringify(chatMessage),
//       });
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.sender}</strong>: {msg.content} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
//           </div>
//         ))}
//       </div>
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatPage;


// import React, { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const ChatPage = () => {
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//     const [message, setMessage] = useState("");
//     const [recipientName, setRecipientName] = useState("");
//     const [messages, setMessages] = useState<Array<{ senderName: string; message: string }>>([]);


//     useEffect(() => {
//         const socket = new SockJS("http://localhost:8080/ws");
//         const client = new Client({
//             webSocketFactory: () => socket,
//             reconnectDelay: 5000,
//             onConnect: () => {
//                 console.log("Connected to WebSocket");

//                 // Subscribe to receive messages sent to this user specifically
//                 client.subscribe("/user/private", (message) => {
//                     const receivedMessage = JSON.parse(message.body);
//                     setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//                 });
//             }
//         });

//         client.activate();
//         setStompClient(client);

//         return () => {
//             if (client) client.deactivate();
//         };
//     }, []);

//     const sendMessage = () => {
//         if (stompClient && message && recipientName) {
//             const chatMessage = {
//                 senderName: "yourUsername", // Replace with the sender's username
//                 recipientName: recipientName,
//                 message: message
//             };
//             stompClient.publish({
//                 destination: "/app/send-message",
//                 body: JSON.stringify(chatMessage),
//             });
//             setMessage("");
//         }
//     };

//     return (
//         <div>
//             <h2>Private Chat</h2>
//             <div>
//                 {messages.map((msg, index) => (
//                     <div key={index}>
//                         <strong>{msg.senderName}</strong>: {msg.message}
//                     </div>
//                 ))}
//             </div>

//             <input
//                 type="text"
//                 placeholder="Recipient Name"
//                 value={recipientName}
//                 onChange={(e) => setRecipientName(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Type a message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default ChatPage;


// import React, { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const randomUsernames = ["Alice", "Bob", "Charlie", "David", "Eve"];

// const ChatPage = () => {
//   type MessageType = {
//     senderName: string;
//     recipientName: string;
//     message: string;
//   };

//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const [recipientName, setRecipientName] = useState<string>(""); // Add state for recipient
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//   const [username, setUsername] = useState<string>("");

//   useEffect(() => {
//     // Set a random username when the component mounts
//     setUsername(randomUsernames[Math.floor(Math.random() * randomUsernames.length)]);

//     const socket = new SockJS(`http://localhost:8080/ws`);
//     const client = new Client({
//       webSocketFactory: () => socket,
//       debug: (str) => {
//         console.log(str);
//       },
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Subscribe to private messages for the user
//         client.subscribe(`/user/${username}/private`, (message) => {
//           const receivedMessage: MessageType = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         });
//       },
//       onStompError: (frame) => {
//         console.error(`Broker reported error: ${frame.headers["message"]}`);
//         console.error(`Additional details: ${frame.body}`);
//       },
//     });

//     client.activate();
//     setStompClient(client);

//     return () => {
//       if (client) client.deactivate();
//     };
//   }, [username]);

//   const sendMessage = () => {
//     if (stompClient && message && recipientName) { // Check if recipientName is set
//       const chatMessage: MessageType = {
//         senderName: username,
//         recipientName: recipientName, // Use the recipient entered by the user
//         message: message,
//       };
//       stompClient.publish({
//         destination: "/app/private-message",
//         body: JSON.stringify(chatMessage),
//       });
//       setMessage(""); // Clear the message input
//     }
//   };

//   return (
//     <div>
//       <h2>Chat as: {username}</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.senderName}</strong>: {msg.message}
//           </div>
//         ))}
//       </div>
//       <input
//         value={recipientName}
//         onChange={(e) => setRecipientName(e.target.value)} // Input for recipient username
//         placeholder="Recipient Username"
//       />
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a private message..."
//       />
//       <button onClick={sendMessage}>Send Private Message</button>
//     </div>
//   );
// };

// export default ChatPage;



// import React, { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const randomUsernames = ["Alice", "Bob", "Charlie", "David", "Eve"];

// const ChatPage = () => {
//   type MessageType = {
//     senderName: string;
//     recipientName: string;
//     message: string;
//   };

//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const [recipientName, setRecipientName] = useState<string>("");
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//   const [username, setUsername] = useState<string>("");
//   const [connectedUsers, setConnectedUsers] = useState<string[]>([]); // State to hold connected users

//   useEffect(() => {
//     // Set a random username when the component mounts
//     setUsername(randomUsernames[Math.floor(Math.random() * randomUsernames.length)]);

//     const socket = new SockJS(`http://localhost:8080/ws`);
//     const client = new Client({
//       webSocketFactory: () => socket,
//       debug: (str) => {
//         console.log(str);
//       },
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Subscribe to private messages for the user
//         client.subscribe(`/user/${username}/private`, (message) => {
//           const receivedMessage: MessageType = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         });

//         // Subscribe to the list of connected users
//         client.subscribe(`/topic/users`, (message) => {
//           const usersList: string[] = JSON.parse(message.body);
//           setConnectedUsers(usersList);
//         });
//       },
//       onStompError: (frame) => {
//         console.error(`Broker reported error: ${frame.headers["message"]}`);
//         console.error(`Additional details: ${frame.body}`);
//       },
//     });

//     client.activate();
//     setStompClient(client);

//     return () => {
//       if (client) client.deactivate();
//     };
//   }, [username]);

//   const sendMessage = () => {
//     if (stompClient && message && recipientName) {
//       const chatMessage: MessageType = {
//         senderName: username,
//         recipientName: recipientName,
//         message: message,
//       };
//       stompClient.publish({
//         destination: "/app/private-message",
//         body: JSON.stringify(chatMessage),
//       });
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>Chat as: {username}</h2>

//       <div>
//         <h3>Connected Users:</h3>
//         {connectedUsers.length > 0 ? (
//           <ul>
//             {connectedUsers.map((user, index) => (
//               <li key={index}>{user}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users connected</p>
//         )}
//       </div>

//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.senderName}</strong>: {msg.message}
//           </div>
//         ))}
//       </div>

//       <input
//         value={recipientName}
//         onChange={(e) => setRecipientName(e.target.value)}
//         placeholder="Recipient Username"
//       />
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a private message..."
//       />
//       <button onClick={sendMessage}>Send Private Message</button>
//     </div>
//   );
// };

// export default ChatPage;


// import React, { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const randomUsernames = ["Alice", "Bob", "Charlie", "David", "Eve"];

// const ChatPage = () => {
//   type MessageType = {
//     senderName: string;
//     recipientName: string;
//     message: string;
//   };

//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const [recipientName, setRecipientName] = useState<string>("");
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//   const [username, setUsername] = useState<string>("");
//   const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

//   useEffect(() => {
//     // Set a unique random username for each session
//     const uniqueUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)] + Math.floor(Math.random() * 1000);
//     setUsername(uniqueUsername);

//     const socket = new SockJS(`http://localhost:8080/ws`);
//     const client = new Client({
//       webSocketFactory: () => socket,
//       debug: (str) => {
//         console.log(str);
//       },
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Register user on connect
//         client.publish({
//           destination: "/app/connect-user",
//           body: uniqueUsername,
//         });

//         // Subscribe to private messages for the user
//         client.subscribe(`/user/${uniqueUsername}/private`, (message) => {
//           const receivedMessage: MessageType = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         });

//         // Subscribe to the list of connected users
//         client.subscribe(`/topic/users`, (message) => {
//           const usersList: string[] = JSON.parse(message.body);
//           setConnectedUsers(usersList);
//         });
//       },
//       onStompError: (frame) => {
//         console.error(`Broker reported error: ${frame.headers["message"]}`);
//         console.error(`Additional details: ${frame.body}`);
//       },
//     });

//     client.activate();
//     setStompClient(client);

//     return () => {
//       if (client) {
//         // Unregister user on disconnect
//         client.publish({
//           destination: "/app/disconnect-user",
//           body: uniqueUsername,
//         });
//         client.deactivate();
//       }
//     };
//   }, []);

//   const sendMessage = () => {
//     if (stompClient && message && recipientName) {
//       const chatMessage: MessageType = {
//         senderName: username,
//         recipientName: recipientName,
//         message: message,
//       };
//       stompClient.publish({
//         destination: "/app/private-message",
//         body: JSON.stringify(chatMessage),
//       });
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>Chat as: {username}</h2>

//       <div>
//         <h3>Connected Users:</h3>
//         {connectedUsers.length > 0 ? (
//           <ul>
//             {connectedUsers.map((user, index) => (
//               <li key={index}>{user}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users connected</p>
//         )}
//       </div>

//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.senderName}</strong>: {msg.message}
//           </div>
//         ))}
//       </div>

//       <input
//         value={recipientName}
//         onChange={(e) => setRecipientName(e.target.value)}
//         placeholder="Recipient Username"
//       />
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a private message..."
//       />
//       <button onClick={sendMessage}>Send Private Message</button>
//     </div>
//   );
// };

// export default ChatPage;


// import React, { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const randomUsernames = ["Alice", "Bob", "Charlie", "David", "Eve"];

// const ChatPage = () => {
//   type MessageType = {
//     senderName: string;
//     recipientName: string;
//     message: string;
//   };

//   const [messages, setMessages] = useState<{ [user: string]: MessageType[] }>({});
//   const [message, setMessage] = useState<string>("");
//   const [recipientName, setRecipientName] = useState<string>("");
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//   const [username, setUsername] = useState<string>("");
//   const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
//   const [selectedChatUser, setSelectedChatUser] = useState<string>("");

//   useEffect(() => {
//     const uniqueUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)] + Math.floor(Math.random() * 1000);
//     setUsername(uniqueUsername);

//     const socket = new SockJS(`http://localhost:8080/ws`);
//     const client = new Client({
//       webSocketFactory: () => socket,
//       debug: (str) => {
//         console.log(str);
//       },
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         client.publish({
//           destination: "/app/connect-user",
//           body: uniqueUsername,
//         });

//         // Subscribe to private messages for the user
//         client.subscribe(`/user/${uniqueUsername}/private`, (message) => {
//           const receivedMessage: MessageType = JSON.parse(message.body);
//           setMessages((prevMessages) => ({
//             ...prevMessages,
//             [receivedMessage.senderName]: [
//               ...(prevMessages[receivedMessage.senderName] || []),
//               receivedMessage,
//             ],
//           }));
//         });

//         // Subscribe to the list of connected users
//         client.subscribe(`/topic/users`, (message) => {
//           const usersList: string[] = JSON.parse(message.body);
//           setConnectedUsers(usersList.filter((user) => user !== uniqueUsername)); // Remove self from list
//         });
//       },
//       onStompError: (frame) => {
//         console.error(`Broker reported error: ${frame.headers["message"]}`);
//         console.error(`Additional details: ${frame.body}`);
//       },
//     });

//     client.activate();
//     setStompClient(client);

//     return () => {
//       if (client) {
//         client.publish({
//           destination: "/app/disconnect-user",
//           body: uniqueUsername,
//         });
//         client.deactivate();
//       }
//     };
//   }, []);

//   const sendMessage = () => {
//     if (stompClient && message && selectedChatUser) {
//       const chatMessage: MessageType = {
//         senderName: username,
//         recipientName: selectedChatUser,
//         message: message,
//       };
//       stompClient.publish({
//         destination: "/app/private-message",
//         body: JSON.stringify(chatMessage),
//       });

//       // Add the message to the current chat history for the selected user
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [selectedChatUser]: [
//           ...(prevMessages[selectedChatUser] || []),
//           chatMessage,
//         ],
//       }));

//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>Chat as: {username}</h2>

//       <div>
//         <h3>Connected Users:</h3>
//         {connectedUsers.length > 0 ? (
//           <ul>
//             {connectedUsers.map((user, index) => (
//               <li key={index} onClick={() => setSelectedChatUser(user)} style={{ cursor: "pointer", fontWeight: selectedChatUser === user ? "bold" : "normal" }}>
//                 {user}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users connected</p>
//         )}
//       </div>

//       <div>
//         <h3>Chat with {selectedChatUser || "..."}</h3>
//         {selectedChatUser && messages[selectedChatUser] ? (
//           messages[selectedChatUser].map((msg, index) => (
//             <div key={index}>
//               <strong>{msg.senderName}</strong>: {msg.message}
//             </div>
//           ))
//         ) : (
//           <p>Select a user to start chatting</p>
//         )}
//       </div>

//       {selectedChatUser && (
//         <div>
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={`Message ${selectedChatUser}...`}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import AppStore from "src/AppStore";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import httpService from "src/httpService";

const ChatPage = () => {
  type MessageType = {
    senderName: string;
    recipientName: string;
    message: string;
  };

  const [messages, setMessages] = useState<{ [user: string]: MessageType[] }>({});
  const [message, setMessage] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [allUsers, setAllUsers] = useState<{ id: number; username: string }[]>([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    const token = AppStore.authToken;
    const extractedUsername = getUsernameFromToken(token);
    
    if (extractedUsername === null) {
      navigate("/login");
      return;
    }

    setUsername(extractedUsername);
    fetchAllUsers();
    console.log(extractedUsername);

    // const socket = new SockJS(`http://localhost:8080/ws`);
    // const client = new Client({
    //   webSocketFactory: () => socket,
    //   debug: (str) => {
    //     console.log(str);
    //   },
    //   beforeConnect: () => {
    //     client.connectHeaders = {
    //       Authorization: `Bearer ${token}`,
    //     };
    //   },
    //   onConnect: () => {
    //     console.log("Connected to WebSocket as ", extractedUsername);
        
    //     client.publish({
    //       destination: "/app/connect-user",
    //       body: extractedUsername,
    //     });  
    //     console.log("miedzyczas");
    //     client.subscribe(`/topic/users`, (message) => {
    //       console.log("Odebrano listę użytkowników:", message.body);
    //       const usersList: string[] = JSON.parse(message.body);
    //       setConnectedUsers([...usersList]);;
    //     });
    //     console.log("zamiedzy");
    //     client.subscribe(`/user/${extractedUsername}/private`, (message) => {
    //       const receivedMessage: MessageType = JSON.parse(message.body);
    //       setMessages((prevMessages) => ({
    //         ...prevMessages,
    //         [receivedMessage.senderName]: [
    //           ...(prevMessages[receivedMessage.senderName] || []),
    //           receivedMessage,
    //         ],
    //       }));
    //     });

    //     // Subscribe to the list of connected users
        
        
    //   },
    //   onStompError: (frame) => {
    //     console.error(`Broker reported error: ${frame.headers["message"]}`);
    //     console.error(`Additional details: ${frame.body}`);
    //     navigate("/login");
    //     return;
    //   },
    // });

    // client.activate();
    // setStompClient(client);

    // return () => {
    //   if (client) {
    //     client.deactivate();
    //   }
    // };
  }, [navigate]);

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
        console.log("miedzyczas");
        client.subscribe(`/topic/users`, (message) => {
          console.log("Odebrano listę użytkowników:", message.body);
          const usersList: string[] = JSON.parse(message.body);
          setConnectedUsers([...usersList]);;
        });
        console.log("zamiedzy");
        client.subscribe(`/user/${username}/private`, (message) => {
          const receivedMessage: MessageType = JSON.parse(message.body);
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
    console.log(allUsers);
    console.log("heja");

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
      console.log("Odpowiedź z backendu:", data);
      console.log(allUsers);
      setAllUsers(data); // Zapisanie danych do stanu
      console.log("Response status:", response.status);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const getUsernameFromToken = (token: string | null): string | null => {
    if (!token) {
      console.error("Brak tokena");
      navigate("/login"); 
      return null;
    }
    try {
        const decodedToken = jwtDecode(token) as { [key: string]: any };
        return decodedToken["cognito:username"];
    } catch (error) {
        console.error("Nie udało się zdekodować tokena:", error);
        navigate("/login");
        return null;
    }
  };

  const sendMessage = () => {
    if (stompClient && message && selectedChatUser) {
      console.log("Wysylam od: ", username);
      const chatMessage: MessageType = {
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

  return (
    <div>
      <h2>Authenticated Chat</h2>

      <div>
        <h3>Connected Users:</h3>
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
    </div>
  );
};

export default ChatPage;
