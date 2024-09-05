// // "use client";

// // import { useEffect, useState } from "react";
// // import { columns } from "./columns";
// // import { DataTable } from "./data-table";
// // import { UserInterface } from "@/util/types";
// // import axios from "axios";

// // export default function TablePage() {
// //   const [data, setData] = useState<UserInterface[]>([]);
// //   const [page, setPage] = useState(1);
// //   const [pageSize] = useState(20);
// //   const [search, setSearch] = useState("");
// //   const [queryType, setQueryType] = useState("email");

// //   useEffect(() => {
// //     async function getData() {
// //       try {
// //         const response = await axios.get(`/api/user/getallusers`, {
// //           params: {
// //             currentPage: page,
// //             queryType: queryType,
// //             userInput: search,
// //           },
// //         });
// //         setData(response.data.allUsers);
// //         console.log(response.data.allUsers);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     }

// //     getData();
// //   }, [page, search, queryType]);

// //   return (
// //     <div className="p-4">
// //       <DataTable
// //         data={data}
// //         columns={columns}
// //         setPage={setPage}
// //         setSearch={setSearch}
// //         setQueryType={setQueryType}
// //         search={search}
// //       />
// //     </div>
// //   );
// // }

// // TablePage.tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import debounce from "lodash.debounce";
import axios from "axios";
import { UserInterface } from "@/util/type";

export default function TablePage() {
  const [data, setData] = useState<UserInterface[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [queryType, setQueryType] = useState("email"); // Ensure queryType is set here

  const fetchData = useCallback(
    debounce(async (search: string, queryType: string, page: number) => {
      try {
        const response = await axios.get(`/api/user/getallusers`, {
          params: {
            currentPage: page,
            queryType: queryType,
            userInput: search,
          },
        });
        setData(response.data.allUsers);
        console.log(response.data.allUsers);
      } catch (error) {
        console.log(error);
      }
    }, 1000),
    []
  );
  useEffect(() => {
    fetchData(search, queryType, page);
  }, [search, page, fetchData]);

  return (
    <div className="">
      <DataTable
        data={data}
        columns={columns}
        setPage={setPage}
        setSearch={setSearch}
        setQueryType={setQueryType}
        search={search}
        queryType={queryType}
      />
    </div>
  );
}
