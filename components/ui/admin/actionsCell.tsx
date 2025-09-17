"use client";

// Next
import { useRouter } from "next/navigation";

// Icons
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import { Pen, Trash } from "lucide-react";

// Bibliotecas
import Cookies from "js-cookie";

// React
import { TransitionStartFunction, useState } from "react";

// Utils
import { setupApiClient } from "../../../utils/api/fetchData";

// Tipagem
interface ActionsCellProps {
  id: string;
  endpoint: string;
  hrfeEdit: string;
  setLoadingUI: TransitionStartFunction;
}

export default function ActionsCell({
  id,
  endpoint,
  hrfeEdit,
  setLoadingUI,
}: ActionsCellProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("auth_token");
  const api = setupApiClient(token);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`${endpoint}/${id}`);
      setLoadingUI(() => {
        router.refresh();
      });
      onOpenChange();
    } catch (error) {
      console.error("Erro ao excluir item", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center gap-2">
      <Tooltip content="Editar Produto">
        <Button
          as="a"
          href={`${hrfeEdit}/${id}`}
          isIconOnly
          variant="light"
          className="text-lg text-default-600 cursor-pointer active:opacity-50"
        >
          <Pen className="w-5 h-5" />
        </Button>
      </Tooltip>
      <Tooltip color="danger" content="Excluir Produto">
        <Button
          isIconOnly
          variant="light"
          className="text-danger"
          onPress={onOpen}
        >
          <Trash className="w-5 h-5" />
        </Button>
      </Tooltip>

      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Excluir Produto</ModalHeader>
              <ModalBody>
                <p>Tem certeza que deseja excluir este produto?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={handleDelete}
                  isLoading={loading}
                >
                  Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
