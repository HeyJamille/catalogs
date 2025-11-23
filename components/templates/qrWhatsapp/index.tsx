// Componentes
import Container from "@/components/ui/container";

// Bibliotecas
import { FaQrcode, FaWhatsapp } from "react-icons/fa";

export default function QrWhatsapp({ img_qr }: { img_qr: string }) {
  return (
    <div className="h-full flex items-center justify-center">
      <Container>
        <div className="flex max-w-7xl flex-col lg:flex-row items-center justify-center gap-16 p-10">
          <div className="flex-1 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-md bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                <FaWhatsapp className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                Conecte seu WhatsApp
              </h1>
            </div>

            <div className="bg-white flex items-center justify-center rounded-2xl shadow-md p-8 border border-slate-100">
              <main className="flex items-center justify-center h-full">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Integre o WhatsApp ao seu CRM
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Conecte sua conta do WhatsApp Web para enviar e receber
                    mensagens diretamente pelo CRM, centralizando o atendimento
                    com seus clientes em um só lugar.
                  </p>

                  <h3 className="text-lg font-medium text-slate-800 mb-4">
                    Siga os passos abaixo:
                  </h3>

                  <ol className="space-y-4 text-slate-700">
                    {[
                      "Abra o WhatsApp no seu celular.",
                      <>
                        Toque em <strong>Menu</strong> ou{" "}
                        <strong>Configurações</strong> e selecione{" "}
                        <strong>Aparelhos conectados</strong>.
                      </>,
                      <>
                        Toque em <strong>Conectar um aparelho</strong>.
                      </>,
                      "Aponte seu celular para esta tela e escaneie o código QR para vincular sua conta.",
                    ].map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-4 animate-fadeIn"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex items-center justify-center transition duration-300 ease-out">
                  <div className="text-center space-y-3">
                    {!img_qr ? (
                      <>
                        <FaQrcode className="h-48 w-48 text-slate-300 mx-auto animate-pulse" />
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                          <span className="font-medium">
                            Gerando código QR...
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={img_qr}
                          alt="QR Code WhatsApp"
                          className="h-48 w-48 mx-auto rounded-md shadow-sm animate-fadeIn"
                        />
                        <div className="flex items-center justify-center text-sm text-green-600">
                          <div className="p-[0.5em] bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">
                            Aponte a câmera do celular para conectar
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
