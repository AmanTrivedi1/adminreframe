import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      serialNo: "1",
      id: "728ed52f",
      amount: 200,
      status: "processing",
      email: "fsefm@example.com",
    },
    {
      serialNo: "2",
      id: "728ed52",
      amount: 400,
      status: "success",
      email: "fsefm@example.com",
    },
    {
      serialNo: "3",
      id: "728ed2",
      amount: 600,
      status: "processing",
      email: "sdfm@example.com",
    },
    {
      serialNo: "4",
      id: "72ed52f",
      amount: 700,
      status: "success",
      email: "fwefm@example.com",
    },
    {
      serialNo: "5",
      id: "728e52f",
      amount: 900,
      status: "pending",
      email: "wfsm@example.com",
    },
    {
      serialNo: "6",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "7",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "8",
      id: "28ed52f",
      amount: 1000,
      status: "failed",
      email: "mwer@example.com",
    },
    {
      serialNo: "9",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "10",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "11",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "12",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "13",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "14",
      id: "28ed52f",
      amount: 1000,
      status: "pending",
      email: "mwer@example.com",
    },
    {
      serialNo: "15",
      id: "28ed52f",
      amount: 1000,
      status: "failed",
      email: "mwer@example.com",
    },
  ];
}

export default async function TablePage() {
  const data = await getData();

  return (
    <div className="  ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
