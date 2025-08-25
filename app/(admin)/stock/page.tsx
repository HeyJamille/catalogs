// Next
import { cookies } from "next/headers";

// Componentes
import InfoCards from "@/components/ui/admin/infoCards";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

// Dados
import StockDataOnCards from "@/data/cards/stockDataOnCards";

// Bibliotecas

// Componentes
import Container from "@/components/ui/container";
import ToolBar from "@/components/ui/admin/toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export default async function StockPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const api = setupApiClient(token);

  const activeProducts = await api.get("/stocks/filters?is_active=true");
  const products = await api.get("/stocks");
  const cardDetails = StockDataOnCards({
    stockData: activeProducts.data.products,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Gestão de Estoque
      </h1>
      <InfoCards data={cardDetails} />

      <Container>
        <ToolBar
          title="Produtos"
          addItemDescription="Produtos"
          handleRefresh={() => console.log("Ativou!")}
          handleAddItems={() => console.log("Ativou")}
        />
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}
