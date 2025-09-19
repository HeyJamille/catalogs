// Bibliotecas
import { addToast, Image } from "@heroui/react";
import { ImageUp } from "lucide-react";
import axios from "axios";

// React
import { ChangeEvent, useState } from "react";

// Componentes
import Loading from "./loading";

// Tipagem
interface UploadProps {
  url: string;
  setUrlImg: (value: string) => void;
  setLoading: (value: boolean) => void;
}

export default function Upload({ url, setUrlImg, setLoading }: UploadProps) {
  const [upload, setUpload] = useState<boolean>(false);

  const key = process.env.NEXT_PUBLIC_KEY_UPLOADING;

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    setLoading(true);
    setUpload(true);

    if (files) {
      if (validTypes.includes(files[0].type)) {
        const data = new FormData();
        data.append("image", files[0]);

        try {
          const resp = await axios.post(
            `https://api.imgbb.com/1/upload?key=${key}`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setUrlImg(resp.data.data.url);
          addToast({
            title: "Imagem enviada!",
            description: "O upload foi efetuado com sucesso.",
            variant: "solid",
            color: "success",
            classNames: {
              title: "text-white",
              description: "text-gray-100",
              icon: "text-white",
            },
          });
        } catch (err) {
          console.log("Error: ", err);
        }
      } else {
        addToast({
          title: "Erro no upload",
          description: "Por favor, selecione um arquivo de imagem (JPG e PNG).",
          variant: "flat",
          color: "danger",
        });
      }
    }

    setLoading(false);
    setUpload(false);
  }

  if (upload) return <Loading />;

  return (
    <div className="flex flex-col space-x-4 items-center ">
      <label
        htmlFor="file-upload"
        className="w-full flex min-h-[226px] flex-col items-center justify-center py-4 px-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus-within:border-blue-500 transition-colors duration-300"
      >
        <main className={`flex flex-col items-center`}>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleFileChange}
          />
          {url ? (
            <div className="w-full flex-col p-3 flex items-center">
              <Image
                src={url}
                radius="md"
                className="rounded-md object-contain w-24"
              />
              <p className="text-sm px-2 text-gray-500">
                Arraste ou clique para enviar sua imagem
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full border border-gray-300 bg-gray-50 transition-colors duration-300">
                <ImageUp className="w-7 h-7 text-gray-500" />
              </div>
              <span className="text-gray-800 font-semibold text-lg">
                Arraste ou clique para enviar sua imagem
              </span>
              <span className="mt-2 text-gray-500 text-sm">
                PNG, JPG ou GIF (máx. 2MB)
              </span>
            </>
          )}
        </main>
      </label>
    </div>
  );
}
