import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import chatbox from "../../assets/Img/chatbox.png";
import icons from "../../utils/icons";
const { FaPaperclip, FaPaperPlane, FaRegImage, FaRobot, FaUser } = icons;
import { IoMdClose } from "react-icons/io";
import { IoExpandOutline } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";

const ChatBox = () => {
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

    // Simulate API call
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

      // Xử lý đường phân cách
      if (/^[━═]+$/.test(paragraph)) {
        return (
          <hr
            key={`hr-${pIndex}`}
            className="my-3 border-t-2 border-cyan-100"
          />
        );
      }

      return (
        <div key={`p-${pIndex}`} className="mb-2 whitespace-pre-wrap">
          {parts.map((part, partIndex) => {
            if (urlRegex.test(part)) {
              if (imageRegex.test(part)) {
                return (
                  <div key={partIndex} className="mt-2">
                    <img
                      src={part}
                      alt="Tour Image"
                      className="max-w-full max-h-40 rounded-lg shadow-sm"
                    />
                  </div>
                );
              }

              if (part.includes("/tourbooking")) {
                return (
                  <Link
                    key={partIndex}
                    to="/tourbooking"
                    className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Hủy tour
                  </Link>
                );
              }

              if (part.includes("/tours/")) {
                const tourId = part.split("/tours/")[1];
                return (
                  <Link
                    key={partIndex}
                    to={`/tours/${tourId}`}
                    className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white bg-[#00c0d1] rounded-lg hover:bg-[#00a8b8] transition-colors"
                  >
                    Xem chi tiết tour
                  </Link>
                );
              }

              return (
                <a
                  key={partIndex}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00c0d1] underline hover:text-[#00a8b8] transition-colors"
                >
                  {part}
                </a>
              );
            }

            // Xử lý bullet points và gạch đầu dòng
            if (/^[•-]\s/.test(part)) {
              return (
                <div key={partIndex} className="flex items-start ml-4">
                  <span className="mr-2">•</span>
                  <span className="flex-1">{part.slice(2)}</span>
                </div>
              );
            }

            // Xử lý tiêu đề in đậm
            if (/^\*\*.*\*\*$/.test(part)) {
              return (
                <strong
                  key={partIndex}
                  className="block mt-2 font-semibold text-gray-800"
                >
                  {part.replace(/\*\*/g, "")}
                </strong>
              );
            }

            // Xử lý nút lệnh
            if (/^\[.+\]$/.test(part)) {
              return (
                <span
                  key={partIndex}
                  className="inline-block mr-2 mt-2 px-3 py-1 bg-gray-100 rounded-lg"
                >
                  {part.slice(1, -1)}
                </span>
              );
            }

            return (
              <span key={partIndex} className="break-words">
                {part}
              </span>
            );
          })}
        </div>
      );
    });
  };
  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating chat button */}
      {!isOpen && (
        <div className="relative">
          <div
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] rounded-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={toggleChat}
          >
            <img src={chatbox} alt="Chat" className="w-8 h-8 rounded-full" />
          </div>

          {/* Tooltip - Rộng hơn */}
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-white px-6 py-3 rounded-lg shadow-lg border animate-pulse min-w-max">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-base font-medium text-gray-700 whitespace-nowrap">
                <p className="font-medium text-[#00c0d1]">
                  GoViet Tours sẵn sàng hỗ trợ!
                </p>
                <p>Quý khách đang cần thông tin gì ạ?</p>
              </span>
            </div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-r-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
            isExpanded ? "w-[600px] h-[700px]" : "w-[400px] h-[550px]"
          }`}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] text-white rounded-t-2xl">
            {/* Control buttons */}
            <div className="absolute -top-12 right-0 flex gap-2">
              <button
                className="p-2 bg-gray-600 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                onClick={toggleExpand}
                title={isExpanded ? "Thu nhỏ" : "Mở rộng"}
              >
                <IoExpandOutline className="w-4 h-4" />
              </button>

              <button
                className="p-2 bg-gray-600 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                onClick={toggleChat}
                title="Đóng chat"
              >
                <IoMdClose className="w-4 h-4" />
              </button>
            </div>

            {/* Header content */}
            <div className="flex items-center px-6 py-4">
              <div className="relative">
                <img
                  src={chatbox}
                  alt="GoViet Tours"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              <div className="ml-4">
                <h3 className="font-bold text-lg">GoViet Tours</h3>
                <p className="text-sm text-cyan-100">
                  Trợ lý du lịch • Đang online
                </p>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3">
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 ${
                    msg.type === "user" ? "order-2" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === "user"
                        ? "bg-[#00c0d1] text-white"
                        : "bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] text-white"
                    }`}
                  >
                    {msg.type === "user" ? (
                      <FaUser className="w-4 h-4" />
                    ) : (
                      <FaRobot className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Message content */}
                <div
                  className={`flex-1 ${msg.type === "user" ? "order-1" : ""}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      msg.type === "user"
                        ? "bg-[#00c0d1] text-white ml-auto rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md border"
                    }`}
                  >
                    {/* Message text */}
                    <div className="text-sm leading-relaxed">
                      {renderMessageText(msg.text)}
                    </div>

                    {/* Options buttons */}
                    {msg.options && (
                      <div className="mt-3 space-y-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            className="block w-full text-left px-3 py-2 text-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg border border-cyan-200 transition-colors"
                            onClick={() => handleOptionClick(opt)}
                          >
                            <span className="mr-2">👉</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timestamp and status */}
                  <div
                    className={`flex items-center mt-1 space-x-1 text-xs text-gray-500 ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {msg.type === "user" && (
                      <BsCheckAll className="w-4 h-4 text-[#00c0d1]" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] flex items-center justify-center text-white">
                  <FaRobot className="w-4 h-4" />
                </div>

                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      Đang trả lời...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 bg-white border-t rounded-b-2xl">
            <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <FaPaperclip className="w-4 h-4" />
              </button>

              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <FaRegImage className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`p-2 rounded-full transition-all ${
                  input.trim()
                    ? "bg-[#00c0d1] text-white hover:bg-[#00a8b8] transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
