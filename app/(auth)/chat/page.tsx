// Componentes
import Menssagens from "@/components/ui/admin/menssagens";
import Overviews from "@/components/ui/admin/overviews";

export default function Inbox() {
  return (
    <>
      <Overviews />
      <main className="flex-1 w-full flex flex-col overflow-hidden">
        <Menssagens />
      </main>
    </>
  );
}
