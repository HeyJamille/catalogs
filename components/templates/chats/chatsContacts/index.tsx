// Componentes
import Container from "@/components/ui/container";
import Input from "@/components/ui/input";

// Bibliotecas
import { Badge, Divider, User } from "@heroui/react";
import { IoIosSearch } from "react-icons/io";

// Next
import Link from "next/link";

// Tipagem
import { ChatsItem } from "@/types/chats";

export default function ChatContacts({
  chatsOverview,
}: {
  chatsOverview: ChatsItem[];
}) {
  return (
    <aside className="w-1/4">
      <Container>
        <header className="py-4 px-3 space-y-1 flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">Chats</h1>
          <Input
            startContent={<IoIosSearch className="w-5 h-5" />}
            placeholder="Pesquisar"
            className="w-full"
          />
        </header>

        <div className="px-4">
          <Divider />
        </div>

        <div className="space-y-2 p-2 overflow-y-auto h-[calc(100vh-210px)]">
          {chatsOverview.map((chat) => {
            const timeLabel = chat.lastMessageTime
              ? new Date(chat.lastMessageTime).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return (
              <Link
                key={chat.id}
                href={`/inbox?id=${chat.id}`}
                className="flex p-2 justify-between items-center rounded-2xl cursor-pointer hover:bg-gray-100 transition"
              >
                <div className="relative">
                  <Badge
                    color="primary"
                    placement="bottom-left"
                    className={`${chat.unreadCount === 0 ? "hidden" : ""}`}
                    content={chat.unreadCount}
                  >
                    <User
                      avatarProps={{
                        src: chat.profilePic,
                        isBordered: true,
                        color: "primary",
                        classNames: { base: "w-11 h-11" },
                        showFallback: true,
                        name: chat.contactName,
                      }}
                      classNames={{
                        base: "space-x-2",
                        name: "truncate w-48",
                        description: "w-50 truncate",
                      }}
                      name={chat.contactName}
                      description={
                        <div className="flex items-center space-x-1">
                          <p>
                            {chat.senderName === "Desconhecido"
                              ? chat.id.split("@")[0]
                              : chat.senderName}
                            :
                          </p>
                          <p className="w-28 truncate">{chat.lastMessage}</p>
                        </div>
                      }
                    />
                  </Badge>
                </div>
                <div className="flex flex-col items-center">
                  <span className="block text-xs text-gray-400">
                    {timeLabel}
                  </span>
                  <img
                    src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
                    alt="Atendido por"
                    className="w-6 h-6 rounded-full border border-gray-200 mt-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </aside>
  );
}
