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

  // State input và typing
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState(0);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const optionTimeoutRef = useRef(null);

  const CHAT_ID = "user-123";
  const BASE_URL = "http://localhost:8088/api/v1";

  // Thời gian tối đa chờ phản hồi từ server trước khi tự tắt trạng thái "đang gõ"
  const TYPING_SAFETY_TIMEOUT_MS = 20000;

  // Cuộn xuống cuối khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto scroll khi có tin nhắn mới hoặc khi bot đang gõ
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

  // Dọn dẹp các timeout khi unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (optionTimeoutRef.current) clearTimeout(optionTimeoutRef.current);
    };
  }, []);

  // Kết nối SSE để nhận tin nhắn real-time
  useEffect(() => {
    const evtSource = new EventSource(`${BASE_URL}/events`);

    // EventSource tự động reconnect ngầm mỗi khi mất kết nối (readyState = CONNECTING),
    // nên onerror có thể bắn liên tục trong lúc nó đang tự retry.
    // Dùng cờ này để chỉ báo lỗi cho user ĐÚNG 1 LẦN, tránh spam message mỗi lần retry.
    let hasNotifiedDisconnect = false;

    evtSource.onopen = () => {
      // Kết nối thành công (lần đầu hoặc sau khi tự reconnect) -> reset cờ báo lỗi
      hasNotifiedDisconnect = false;
    };

    evtSource.onmessage = (e) => {
      try {
        const { chatId, reply } = JSON.parse(e.data);
        if (chatId === CHAT_ID) {
          clearTypingSafetyTimeout();
          setIsTyping(false);
          addBotMessage(reply);
        }
      } catch (err) {
        console.error("Invalid SSE data", err);
        clearTypingSafetyTimeout();
        setIsTyping(false);
        addBotMessage("Xin lỗi, có lỗi xảy ra khi xử lý dữ liệu từ server.");
      }
    };

    evtSource.onerror = (err) => {
      console.error("SSE connection error", err);

      // readyState === CONNECTING (0): trình duyệt đang tự động retry ngầm,
      // chưa phải lỗi nghiêm trọng -> không báo, không spam message.
      if (evtSource.readyState === EventSource.CONNECTING) {
        return;
      }

      // readyState === CLOSED (2): kết nối đã đóng hẳn, không tự retry nữa
      // -> đây mới là lúc cần báo cho user, và chỉ báo 1 lần.
      if (!hasNotifiedDisconnect) {
        hasNotifiedDisconnect = true;
        clearTypingSafetyTimeout();
        setIsTyping(false);
        addBotMessage("Kết nối bị gián đoạn. Vui lòng thử lại sau.");
      }
    };

    return () => evtSource.close();
  }, []);

  // Bắt đầu đếm ngược an toàn: nếu SSE không phản hồi kịp, tự tắt "đang gõ"
  const startTypingSafetyTimeout = () => {
    clearTypingSafetyTimeout();
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      addBotMessage(
        "Phản hồi mất nhiều thời gian hơn dự kiến. Vui lòng thử lại.",
      );
    }, TYPING_SAFETY_TIMEOUT_MS);
  };

  const clearTypingSafetyTimeout = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

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

    const messageToSend = input;
    addUserMessage(messageToSend);
    setInput("");
    setIsTyping(true);
    startTypingSafetyTimeout();

    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          chatId: CHAT_ID,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Status ${res.status}: ${errorText || "Không tìm thấy endpoint"}`,
        );
      }
      // Thành công: chờ phản hồi thật sự đến qua SSE (onmessage sẽ tắt isTyping)
    } catch (err) {
      clearTypingSafetyTimeout();
      setIsTyping(false);
      addBotMessage(`Lỗi kết nối: ${err.message}`);
      console.error("Error:", err);
    }
  };

  // Xử lý click option button — gửi qua API thật thay vì giả lập cứng
  const handleOptionClick = (option) => {
    addUserMessage(option);
    setIsTyping(true);
    startTypingSafetyTimeout();

    fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: option,
        chatId: CHAT_ID,
      }),
    }).catch((err) => {
      clearTypingSafetyTimeout();
      setIsTyping(false);
      addBotMessage(`Lỗi kết nối: ${err.message}`);
      console.error("Error:", err);
    });
    // Phản hồi thật sự sẽ đến qua SSE (onmessage sẽ tắt isTyping)
  };

  // Parse và render rich text
  const renderMessageText = (text) => {
    // Không dùng flag "g" cho các regex dùng trong .test()/kiểm tra từng phần tử,
    // vì flag "g" khiến lastIndex bị lưu trạng thái giữa các lần gọi .test()
    // liên tiếp, dẫn tới nhận diện URL/ảnh sai khi có nhiều URL trong 1 tin nhắn.
    const splitUrlRegex = /(https?:\/\/[^\s]+)/gi; // chỉ dùng để split, an toàn
    const isUrlRegex = /^https?:\/\/[^\s]+$/i; // dùng để test từng phần, không có "g"
    const isImageRegex = /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif)$/i; // không có "g"

    return text.split("\n").map((paragraph, pIndex) => {
      const parts = paragraph.split(splitUrlRegex);

      // Horizontal line
      if (/^[━═]+$/.test(paragraph)) {
        return { type: "hr", key: `hr-${pIndex}` };
      }

      return {
        type: "paragraph",
        key: `p-${pIndex}`,
        parts: parts.map((part, partIndex) => {
          // URL patterns
          if (isUrlRegex.test(part)) {
            if (isImageRegex.test(part)) {
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
