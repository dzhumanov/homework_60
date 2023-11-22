import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import ChatForm from "./Components/ChatForm/ChatForm";
import Messages from "./Components/Message/Messages";
import { MessageProps } from "./types";

const url: string = "http://146.185.154.90:8000/messages";

function App() {
  const [messages, setMessages] = useState<MessageProps[]>();
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const fetchMessages = useCallback(async (url: string): Promise<void> => {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  }, []);

  useEffect(() => {
    void fetchMessages(url);
  }, [fetchMessages]);

  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterval = () => {
    const id = setInterval(() => {
      void fetchMessages(url);
    }, 3000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    void fetchMessages(url);
    startInterval();

    return () => {
      stopInterval();
    };
  }, [fetchMessages]);
  

  return (
    <div className="container w-50">
      <div
        className="message-wrapper"
        ref={messagesContainerRef}
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        <Messages Messages={messages || []} />
      </div>
      <ChatForm />
    </div>
  );
}

export default App;
