import React, { useState, useEffect, useRef } from "react";
import ChatBoxPresentational from "./ChatBoxPresentational";

const ChatBoxContainer = () => {
  // State quản lý UI
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // State quản lý tin nhắn
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của GoViet Tours. Bạn quan tâm đến chương trình du lịch nơi nào trên Việt Nam ạ?",
      options: ["Tour Miền Bắc", "Tour Miền Trung", "Tour Miền Nam"],
      type: "bot",
      timestamp: new Date(),
    },
  ]);

  // State input và typing
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState(0);

  const messagesEndRef = useRef(null);
  const CHAT_ID = "user-123";
  const BASE_URL = "http://localhost:8088/api/v1";

  // Cuộn xuống cuối tin nhắn
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto scroll khi có tin nhắn mới
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, typingDots]);

  // Animation typing dots
  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setTypingDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, [isTyping]);

  // Kết nối SSE để nhận tin nhắn real-time
  useEffect(() => {
    const evtSource = new EventSource(`${BASE_URL}/events`);

    evtSource.onmessage = (e) => {
      try {
        const { chatId, reply } = JSON.parse(e.data);
        if (chatId === CHAT_ID) {
          setIsTyping(false);
          addBotMessage(reply);
        }
      } catch (err) {
        console.error("Invalid SSE data", err);
        setIsTyping(false);
        addBotMessage("Xin lỗi, có lỗi xảy ra khi xử lý dữ liệu từ server.");
      }
    };

    evtSource.onerror = (err) => {
      console.error("SSE connection error", err);
      setIsTyping(false);
      addBotMessage("Kết nối bị gián đoạn. Vui lòng thử lại sau.");
    };

    return () => evtSource.close();
  }, []);

  // Thêm tin nhắn bot
  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        type: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Thêm tin nhắn user
  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        type: "user",
        timestamp: new Date(),
      },
    ]);
  };

  // Toggle mở/đóng chat
  const toggleChat = () => setIsOpen(!isOpen);

  // Toggle mở rộng/thu nhỏ
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Gửi tin nhắn qua API
  const sendMessage = async () => {
    if (!input.trim()) return;

    addUserMessage(input);
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
      addBotMessage(`Lỗi kết nối: ${err.message}`);
      console.error("Error:", err);
    }
  };

  // Xử lý click option button
  const handleOptionClick = (option) => {
    addUserMessage(option);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(
        `Tuyệt vời! Tôi sẽ giới thiệu cho bạn các tour ${option} phù hợp nhất.`
      );
    }, 1500);
  };

  // Parse và render rich text (links, images, formatting)
  const renderMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const imageRegex = /(https?:\/\/\S+\.(?:jpg|jpeg|png|gif))(?![^<]*>)/gi;

    return text.split("\n").map((paragraph, pIndex) => {
      const parts = paragraph.split(urlRegex);

      // Horizontal line
      if (/^[━═]+$/.test(paragraph)) {
        return { type: "hr", key: `hr-${pIndex}` };
      }

      return {
        type: "paragraph",
        key: `p-${pIndex}`,
        parts: parts.map((part, partIndex) => {
          // URL patterns
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

          // Bullet points
          if (/^[•-]\s/.test(part)) {
            return { type: "bullet", text: part.slice(2), key: partIndex };
          }

          // Bold text
          if (/^\*\*.*\*\*$/.test(part)) {
            return {
              type: "bold",
              text: part.replace(/\*\*/g, ""),
              key: partIndex,
            };
          }

          // Command brackets
          if (/^\[.+\]$/.test(part)) {
            return { type: "command", text: part.slice(1, -1), key: partIndex };
          }

          // Plain text
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
