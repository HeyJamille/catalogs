// Componentes
import Layout from "@/components/templates/admin/layout";
import Menssagens from "@/components/ui/admin/menssagens";
import Overviews from "@/components/ui/admin/overviews";

export default function Inbox() {
  return (
    <Layout>
      <Overviews />
      <Menssagens />
    </Layout>
  );
}
