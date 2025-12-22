// Componentes
import Menssagens from "@/components/ui/admin/menssagens";
import Overviews from "@/components/ui/admin/overviews";

// Utils
import { setupApiClient } from "@/utils/api";

// Next
import { cookies } from "next/headers";

export default async function Inbox() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const api = setupApiClient({ token: token });
  const session = (await api.get("/users/me")).data.user.enterprise.session_id;
  const status = (await api.get(`/wpps/session/${session}/status`)).data
    .message;

  return (
    <>
      <Overviews status={status} />
      <main className="flex-1 w-full flex flex-col overflow-hidden">
        <Menssagens />
      </main>
    </>
  );
}
