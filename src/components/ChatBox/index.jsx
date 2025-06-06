import React, { useState, useEffect, useRef } from "react";
import ChatBoxPresentational from "./ChatBoxPresentational";

const ChatBoxContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của GoViet Tours. Bạn quan tâm đến chương trình du lịch nơi nào trên Việt Nam ạ?",
      options: ["Tour Miền Bắc", "Tour Miền Trung", "Tour Miền Nam"],
      type: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState(0);
  const messagesEndRef = useRef(null);
  const CHAT_ID = "user-123";
  const BASE_URL = "http://localhost:8088/api/v1";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, typingDots]);

  useEffect(() => {
    let typingInterval = null;
    if (isTyping) {
      typingInterval = setInterval(() => {
        setTypingDots((prev) => (prev + 1) % 4);
      }, 500);
    }
    return () => clearInterval(typingInterval);
  }, [isTyping]);

  useEffect(() => {
    const evtSource = new EventSource(`${BASE_URL}/events`);
    evtSource.onmessage = (e) => {
      try {
        const { chatId, reply } = JSON.parse(e.data);
        if (chatId === CHAT_ID) {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: reply,
              type: "bot",
              timestamp: new Date(),
            },
          ]);
        }
      } catch (err) {
        console.error("Invalid SSE data", err);
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Xin lỗi, có lỗi xảy ra khi xử lý dữ liệu từ server.",
            type: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    };

    evtSource.onerror = (err) => {
      console.error("SSE connection error", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Kết nối bị gián đoạn. Vui lòng thử lại sau.",
          type: "bot",
          timestamp: new Date(),
        },
      ]);
    };

    return () => evtSource.close();
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          chatId: CHAT_ID,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Status ${res.status}: ${errorText || "Không tìm thấy endpoint"}`
        );
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `Lỗi kết nối: ${err.message}`,
          type: "bot",
          timestamp: new Date(),
        },
      ]);
      console.error("Error:", err);
    }
  };

  const handleOptionClick = (option) => {
    const newMessage = {
      id: Date.now(),
      text: option,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Tuyệt vời! Tôi sẽ giới thiệu cho bạn các tour ${option} phù hợp nhất.`,
          type: "bot",
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const renderMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const imageRegex = /(https?:\/\/\S+\.(?:jpg|jpeg|png|gif))(?![^<]*>)/gi;

    return text.split("\n").map((paragraph, pIndex) => {
      const parts = paragraph.split(urlRegex);

      if (/^[━═]+$/.test(paragraph)) {
        return { type: "hr", key: `hr-${pIndex}` };
      }

      return {
        type: "paragraph",
        key: `p-${pIndex}`,
        parts: parts.map((part, partIndex) => {
          if (urlRegex.test(part)) {
            if (imageRegex.test(part)) {
              return { type: "image", src: part, key: partIndex };
            }
            if (part.includes("/tourbooking")) {
              return { type: "tourbookingLink", key: partIndex };
            }
            if (part.includes("/tours/")) {
              const tourId = part.split("/tours/")[1];
              return { type: "tourLink", tourId, key: partIndex };
            }
            return { type: "link", href: part, text: part, key: partIndex };
          }
          if (/^[•-]\s/.test(part)) {
            return { type: "bullet", text: part.slice(2), key: partIndex };
          }
          if (/^\*\*.*\*\*$/.test(part)) {
            return {
              type: "bold",
              text: part.replace(/\*\*/g, ""),
              key: partIndex,
            };
          }
          if (/^\[.+\]$/.test(part)) {
            return {
              type: "command",
              text: part.slice(1, -1),
              key: partIndex,
            };
          }
          return { type: "text", text: part, key: partIndex };
        }),
      };
    });
  };

  return (
    <ChatBoxPresentational
      isOpen={isOpen}
      isExpanded={isExpanded}
      messages={messages}
      input={input}
      isTyping={isTyping}
      toggleChat={toggleChat}
      toggleExpand={toggleExpand}
      sendMessage={sendMessage}
      handleOptionClick={handleOptionClick}
      setInput={setInput}
      renderMessageText={renderMessageText}
      messagesEndRef={messagesEndRef}
    />
  );
};

export default ChatBoxContainer;
