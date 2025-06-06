import React from "react";
import { Link } from "react-router-dom";
import chatbox from "../../assets/Img/chatbox.png";
import {
  FaPaperclip,
  FaPaperPlane,
  FaRegImage,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoExpandOutline } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";

const ChatBoxPresentational = ({
  isOpen,
  isExpanded,
  messages,
  input,
  isTyping,
  toggleChat,
  toggleExpand,
  sendMessage,
  handleOptionClick,
  setInput,
  renderMessageText,
  messagesEndRef,
}) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
      {/* Floating chat button */}
      {!isOpen && (
        <div className="relative">
          <div
            className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] rounded-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={toggleChat}
          >
            <img
              src={chatbox}
              alt="Chat"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
          </div>

          {/* Tooltip */}
          <div className="hidden sm:block absolute left-16 sm:left-20 top-1/2 transform -translate-y-1/2 bg-white px-5 py-1 sm:px-6 sm:py-2 rounded-lg shadow-lg border animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium text-[#00c0d1] whitespace-nowrap">
                  GoViet Tours sẵn sàng hỗ trợ!
                </p>
                <p className="text-gray-700 whitespace-nowrap">
                  Quý khách đang cần thông tin gì ạ?
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-r-8 border-r-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 
            w-[90vw] h-[80vh] sm:w-[400px] sm:h-[550px] md:w-[450px] md:h-[600px] lg:w-[500px] lg:h-[650px] 
            ${
              isExpanded
                ? "w-[85vw] h-[80vh] sm:w-[450px] sm:h-[600px] md:w-[520px] md:h-[650px] lg:w-[600px] lg:h-[680px]"
                : ""
            }`}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] text-white rounded-t-2xl">
            {/* Control buttons */}
            <div className="absolute -top-10 sm:-top-12 left-0 flex gap-2">
              <button
                className="p-1.5 sm:p-2 bg-gray-600 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                onClick={toggleExpand}
                title={isExpanded ? "Thu nhỏ" : "Mở rộng"}
              >
                <IoExpandOutline className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                className="p-1.5 sm:p-2 bg-gray-600 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                onClick={toggleChat}
                title="Đóng chat"
              >
                <IoMdClose className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Header content */}
            <div className="flex items-center px-4 py-3 sm:px-6 sm:py-4">
              <div className="relative">
                <img
                  src={chatbox}
                  alt="GoViet Tours"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="font-bold text-base sm:text-lg">GoViet Tours</h3>
                <p className="text-xs sm:text-sm text-cyan-100">
                  Trợ lý du lịch • Đang online
                </p>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2 sm:space-x-3 ${
                  msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      msg.type === "user"
                        ? "bg-[#00c0d1] text-white"
                        : "bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] text-white"
                    }`}
                  >
                    {msg.type === "user" ? (
                      <FaUser className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <FaRobot className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </div>
                </div>

                {/* Message content */}
                <div className="flex-1 max-w-[85%]">
                  <div
                    className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm ${
                      msg.type === "user"
                        ? "bg-[#00c0d1] text-white ml-auto rounded-br-sm sm:rounded-br-md"
                        : "bg-white text-gray-800 mr-auto rounded-bl-sm sm:rounded-bl-md border"
                    }`}
                  >
                    {/* Message text */}
                    <div className="text-xs sm:text-sm leading-relaxed">
                      {renderMessageText(msg.text).map((item) => {
                        if (item.type === "hr") {
                          return (
                            <hr
                              key={item.key}
                              className="my-2 sm:my-3 border-t-2 border-cyan-100"
                            />
                          );
                        }
                        return (
                          <div
                            key={item.key}
                            className="mb-1 sm:mb-2 whitespace-pre-wrap"
                          >
                            {item.parts.map((part) => {
                              if (part.type === "image") {
                                return (
                                  <div key={part.key} className="mt-1 sm:mt-2">
                                    <img
                                      src={part.src}
                                      alt="Tour Image"
                                      className="max-w-full max-h-32 sm:max-h-40 rounded-lg shadow-sm"
                                    />
                                  </div>
                                );
                              }
                              if (part.type === "tourbookingLink") {
                                return (
                                  <Link
                                    key={part.key}
                                    to="/tourbooking"
                                    className="inline-block px-3 py-1 sm:px-4 sm:py-2 mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                  >
                                    Hủy tour
                                  </Link>
                                );
                              }
                              if (part.type === "tourLink") {
                                return (
                                  <Link
                                    key={part.key}
                                    to={`/tours/${part.tourId}`}
                                    className="inline-block px-3 py-1 sm:px-4 sm:py-2 mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-white bg-[#00c0d1] rounded-lg hover:bg-[#00a8b8] transition-colors"
                                  >
                                    Xem chi tiết tour
                                  </Link>
                                );
                              }
                              if (part.type === "link") {
                                return (
                                  <a
                                    key={part.key}
                                    href={part.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00c0d1] underline hover:text-[#00a8b8] transition-colors text-xs sm:text-sm"
                                  >
                                    {part.text}
                                  </a>
                                );
                              }
                              if (part.type === "bullet") {
                                return (
                                  <div
                                    key={part.key}
                                    className="flex items-start mt-1"
                                  >
                                    <span className="mr-2 text-xs sm:text-sm">
                                      •
                                    </span>
                                    <span className="flex-1 text-xs sm:text-sm">
                                      {part.text}
                                    </span>
                                  </div>
                                );
                              }
                              if (part.type === "bold") {
                                return (
                                  <strong
                                    key={part.key}
                                    className="block mt-1 sm:mt-2 font-semibold text-xs sm:text-sm"
                                  >
                                    {part.text}
                                  </strong>
                                );
                              }
                              if (part.type === "command") {
                                return (
                                  <span
                                    key={part.key}
                                    className="inline-block ml-1 sm:ml-2 mt-1 sm:mt-2 px-2 sm:px-3 py-1 bg-gray-100 rounded-lg text-xs sm:text-sm"
                                  >
                                    {part.text}
                                  </span>
                                );
                              }
                              return (
                                <span
                                  key={part.key}
                                  className="break-words text-xs sm:text-sm"
                                >
                                  {part.text}
                                </span>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    {/* Options buttons */}
                    {msg.options && (
                      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            className="flex items-center justify-start w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg border border-cyan-200 transition-colors"
                            onClick={() => handleOptionClick(opt)}
                          >
                            <span className="mr-2">👉</span>
                            <span>{opt}</span>
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
                      <BsCheckAll className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c0d1]" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#00c0d1] to-[#00a8b8] flex items-center justify-center text-white">
                  <FaRobot className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white rounded-xl sm:rounded-2xl rounded-bl-sm sm:rounded-bl-md px-3 sm:px-4 py-2 sm:py-3 shadow-sm border">
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
                    <span className="text-xs sm:text-sm text-gray-600">
                      Đang trả lời...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 sm:p-4 bg-white border-t rounded-b-2xl">
            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <FaPaperclip className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <FaRegImage className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-transparent outline-none text-xs sm:text-sm placeholder-gray-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`p-1.5 sm:p-2 rounded-full transition-all ${
                  input.trim()
                    ? "bg-[#00c0d1] text-white hover:bg-[#00a8b8] transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaPaperPlane className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBoxPresentational;
