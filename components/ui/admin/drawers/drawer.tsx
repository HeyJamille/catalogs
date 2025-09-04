// Bibliotecas
import {
  Drawer as Drw,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";

// React
import { ReactNode } from "react";

// Tipagem
interface DrawerProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function Drawer({
  title,
  isOpen,
  children,
  onClose,
}: DrawerProps) {
  return (
    <Drw isOpen={isOpen} size="md" onClose={onClose}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
            <DrawerBody className="w-full">{children}</DrawerBody>
          </>
        )}
      </DrawerContent>
      <DrawerFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Fechar
        </Button>
        <Button color="primary" onPress={onClose}>
          Action
        </Button>
      </DrawerFooter>
    </Drw>
  );
}
