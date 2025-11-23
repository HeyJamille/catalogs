// Componentes
import Container from "@/components/ui/container";

// React
import { useRef, useEffect, useState } from "react";

// Bibliotecas
import { User } from "@heroui/react";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

// Tipagem
import { MessagesItem } from "@/types/chatMenssages";
import { useRouter, useSearchParams } from "next/navigation";
interface ListChatsProps {
  messages?: MessagesItem[];
}

export default function ListChats({ messages }: ListChatsProps) {
  const [msg, setMsg] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const chatId = useSearchParams();
  const api = setupApiClient({});
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSendMsg() {
    await api.post("/chats/send", { to: chatId.get("id"), msg });
    router.refresh();
    setMsg("");
  }

  console.log("chatId: ", chatId.get("id"));
  return (
    <Container>
      <section className="flex flex-col overflow-hidden">
        {messages && messages.length > 0 ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <User
                  avatarProps={{
                    src: messages[0].profilePic,
                    isBordered: true,
                    color: "primary",
                    classNames: { base: "w-12 h-12" },
                    showFallback: true,
                    name: messages[0].contactName,
                  }}
                  classNames={{
                    base: "flex items-center space-x-2",
                    name: "truncate text-lg font-semibold",
                    description: "truncate text-sm text-gray-500",
                  }}
                  name={messages[0].contactName}
                  description={messages[0].contactNumber.split("@")[0]}
                />
              </div>
              <div className="flex items-center space-x-2">
                {/* <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button> */}
              </div>
            </div>

            <div
              id="messages"
              ref={containerRef}
              className="h-[670px] overflow-y-auto scroll‑smooth overflow-x-hidden px-6 py-4 space-y-4"
            >
              {messages.map((group, groupIndex) =>
                group.chat.map((msg, msgIndex) => {
                  const fromMe = msg.isMe;
                  return (
                    <div
                      key={`${groupIndex}-${msgIndex}`}
                      className={`flex items-end ${fromMe ? "justify-end" : "justify-start"}`}
                    >
                      {!fromMe && (
                        <img
                          src={
                            msg.profilePic || "https://via.placeholder.com/40"
                          }
                          alt={group.contactName}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <div
                        className={`max-w-xs text-sm ${
                          fromMe
                            ? "bg-blue-500 text-white rounded-lg rounded-tr-none"
                            : "bg-gray-200 text-gray-700 rounded-lg rounded-bl-none"
                        } px-4 py-2`}
                      >
                        {msg.body}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="relative flex items-center">
                <button
                  type="button"
                  className="absolute left-0 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Escreva sua mensagem..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (msg.trim().length > 0) {
                        handleSendMsg();
                      }
                    }
                  }}
                  className="w-full pl-12 pr-16 py-2 bg-gray-100 rounded-full focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => handleSendMsg()}
                  className="absolute right-0 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-6 w-6 rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 h-screen flex items-center justify-center"></div>
        )}
      </section>
    </Container>
  );
}
