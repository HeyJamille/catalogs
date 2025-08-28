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
import { useEffect, useState } from "react";

// API
import { setupApiClient } from "../../../utils/api/fetchData";

interface ActionsCellProps {
  productId: string;
}

export default function ActionsCell({ productId }: ActionsCellProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const api = setupApiClient();

  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/stocks/${productId}`);

      onOpenChange();
    } catch (error) {
      console.error("Erro ao excluir produto", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center gap-2">
      <Tooltip content="Editar Produto">
        <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
          <Pen className="w-5 h-5" />
        </span>
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
