import { Avatar, Box, Divider, IconButton } from "@mui/material";
import { BsFillPersonPlusFill, BsFilter } from "react-icons/bs";
import { GoTag } from "react-icons/go";
import { IoIosInformation, IoIosSearch } from "react-icons/io";
import { IoChatbubblesOutline, IoInformationOutline } from "react-icons/io5";

export default function Menssagens() {
  return (
    // <div className="flex flex-col w-full items-center justify-center text-center py-20 px-4 sm:px-6 lg:px-8 gap-6">
    //   <div className="rounded-xl p-8 max-w-md w-full border border-gray-100">
    //     <div className="flex justify-center mb-4">
    //       <IoChatbubblesOutline className="w-14 h-14 text-gray-500 animate-pulse" />
    //     </div>

    //     <h2 className="text-2xl font-semibold text-gray-700 mb-4">
    //       Selecione uma conversa
    //     </h2>

    //     <p className="text-gray-500">
    //       Assim que seu cliente enviar uma mensagem, ela aparecerá aqui.
    //       Organize, responda e acompanhe tudo num só lugar.
    //     </p>
    //   </div>
    // </div>
    <div className="w-full h-screen overflow-hidden">
      <header className="bg-white p-4 flex text-gray-700">
        <div className="flex w-full items-center space-x-2">
          <Avatar
            src={
              "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
            }
            alt="Sarah Anderson"
            sx={{ width: 40, height: 40 }}
          />
          <h1 className="text-lg text-gray">Sarah Anderson</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: "8px",
                color: "grey.700",
                "&:hover": {
                  backgroundColor: "grey.100",
                  borderColor: "grey.600",
                },
              }}
            >
              <IoIosSearch className="w-5 h-5" />
            </IconButton>

            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: "8px",
                color: "grey.700",
                "&:hover": {
                  backgroundColor: "grey.100",
                  borderColor: "grey.600",
                },
              }}
            >
              <GoTag className="w-5 h-5" />
            </IconButton>

            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: "8px",
                color: "grey.700",
                "&:hover": {
                  backgroundColor: "grey.100",
                  borderColor: "grey.600",
                },
              }}
            >
              <IoInformationOutline className="w-5 h-5" />
            </IconButton>
          </Box>
        </div>
      </header>

      <Divider />

      <div className="h-[740px] overflow-y-auto p-4">
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">Hey Bob, how's it going?</p>
          </div>
        </div>

        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>
              Hi Alice! I'm good, just finished a great book. How about you?
            </p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">
              That book sounds interesting! What's it about?
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>
              It's about an astronaut stranded on Mars, trying to survive.
              Gripping stuff!
            </p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">
              I'm intrigued! Maybe I'll borrow it from you when you're done?
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>Of course! I'll drop it off at your place tomorrow.</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">Thanks, you're the best!</p>
          </div>
        </div>

        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>Anytime! Let me know how you like it. 😊</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">So, pizza next week, right?</p>
          </div>
        </div>

        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>Absolutely! Can't wait for our pizza date. 🍕</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">Hoorayy!!</p>
          </div>
        </div>
      </div>

      <footer className="w-full p-2  ">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          {/* <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
            Send
          </button> */}
        </div>
      </footer>
    </div>
  );
}
