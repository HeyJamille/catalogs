// Bibliotecas
import { atomWithStorage } from "jotai/utils";

export const isMenuOpenAtom = atomWithStorage<boolean>("isMenuOpen", false);
