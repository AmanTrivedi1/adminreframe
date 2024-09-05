// // "use client";

// // import React from "react";
// // import { Button } from "@/components/ui/button";
// // import { CiViewColumn } from "react-icons/ci";
// // import { Input } from "@/components/ui/input";
// // import {
// //   DropdownMenu,
// //   DropdownMenuCheckboxItem,
// //   DropdownMenuContent,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import {
// //   ColumnDef,
// //   flexRender,
// //   SortingState,
// //   ColumnFiltersState,
// //   VisibilityState,
// //   getCoreRowModel,
// //   getSortedRowModel,
// //   getFilteredRowModel,
// //   getPaginationRowModel,
// //   useReactTable,
// // } from "@tanstack/react-table";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Plus } from "lucide-react";
// // import Link from "next/link";
// // import { UserInterface } from "@/util/types";

// // interface DataTableProps {
// //   columns: ColumnDef<UserInterface, any>[];
// //   data: UserInterface[];
// // }

// // export function DataTable({
// //   columns,
// //   data,
// // }: DataTableProps) {
// //   const [sorting, setSorting] = React.useState<SortingState>([]);
// //   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
// //   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
// //   const [rowSelection, setRowSelection] = React.useState({});

// //   const table = useReactTable({
// //     data,
// //     columns,
// //     getCoreRowModel: getCoreRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //     onSortingChange: setSorting,
// //     getSortedRowModel: getSortedRowModel(),
// //     onColumnFiltersChange: setColumnFilters,
// //     getFilteredRowModel: getFilteredRowModel(),
// //     onColumnVisibilityChange: setColumnVisibility,
// //     onRowSelectionChange: setRowSelection,
// //     state: {
// //       sorting,
// //       columnFilters,
// //       columnVisibility,
// //       rowSelection,
// //     },
// //   });

// //   return (
// //     <>
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center gap-x-2">
// //           <div className="flex items-center py-4">
// //             <Input
// //               placeholder="Filter emails..."
// //               value={
// //                 (table.getColumn("email")?.getFilterValue() as string) ?? ""
// //               }
// //               onChange={(event) =>
// //                 table.getColumn("email")?.setFilterValue(event.target.value)
// //               }
// //               className="max-w-sm"
// //             />
// //           </div>
// //           <div>
// //             <Button className="w-full sm:flex items-center gap-x-1 hidden">
// //               <Link
// //                 className="flex items-center justify-center gap-x-2"
// //                 href="/dashboard/createnewuser"
// //               >
// //                 Add user <Plus />
// //               </Link>
// //             </Button>
// //             <Button className="sm:hidden">
// //               <Link
// //                 className="flex items-center justify-center gap-x-2"
// //                 href="/dashboard/createnewuser"
// //               >
// //                 <Plus />
// //               </Link>
// //             </Button>
// //           </div>
// //         </div>
// //         <DropdownMenu>
// //           <DropdownMenuTrigger asChild>
// //             <div>
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 className="ml-auto hidden sm:block"
// //               >
// //                 Column
// //               </Button>
// //               <Button variant="outline" size="sm" className="ml-auto sm:hidden">
// //                 <CiViewColumn />
// //               </Button>
// //             </div>
// //           </DropdownMenuTrigger>
// //           <DropdownMenuContent align="end">
// //             {table
// //               .getAllColumns()
// //               .filter((column) => column.getCanHide())
// //               .map((column) => (
// //                 <DropdownMenuCheckboxItem
// //                   key={column.id}
// //                   className="capitalize"
// //                   checked={column.getIsVisible()}
// //                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
// //                 >
// //                   {column.id}
// //                 </DropdownMenuCheckboxItem>
// //               ))}
// //           </DropdownMenuContent>
// //         </DropdownMenu>
// //       </div>
// //       <div className="rounded-md border">
// //         <Table>
// //           <TableHeader>
// //             {table.getHeaderGroups().map((headerGroup) => (
// //               <TableRow key={headerGroup.id}>
// //                 {headerGroup.headers.map((header) => (
// //                   <TableHead key={header.id}>
// //                     {header.isPlaceholder
// //                       ? null
// //                       : flexRender(
// //                           header.column.columnDef.header,
// //                           header.getContext()
// //                         )}
// //                   </TableHead>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableHeader>
// //           <TableBody>
// //             {table.getRowModel().rows.length ? (
// //               table.getRowModel().rows.map((row) => (
// //                 <TableRow
// //                   key={row.id}
// //                   data-state={row.getIsSelected() && "selected"}
// //                 >
// //                   {row.getVisibleCells().map((cell) => (
// //                     <TableCell key={cell.id}>
// //                       {flexRender(
// //                         cell.column.columnDef.cell,
// //                         cell.getContext()
// //                       )}
// //                     </TableCell>
// //                   ))}
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell
// //                   colSpan={columns.length}
// //                   className="h-24 text-center"
// //                 >
// //                   No results.
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </div>
// //       <div className="flex items-center justify-end space-x-2 py-4">
// //         <Button
// //           variant="outline"
// //           size="sm"
// //           onClick={() => table.previousPage()}
// //           disabled={!table.getCanPreviousPage()}
// //         >
// //           Previous
// //         </Button>
// //         <Button
// //           variant="outline"
// //           size="sm"
// //           onClick={() => table.nextPage()}
// //           disabled={!table.getCanNextPage()}
// //         >
// //           Next
// //         </Button>
// //       </div>
// //     </>
// //   );
// // }
// // TODO above code is working fine

// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { CiViewColumn } from "react-icons/ci";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   ColumnDef,
//   flexRender,
//   SortingState,
//   ColumnFiltersState,
//   VisibilityState,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Plus } from "lucide-react";
// import Link from "next/link";
// import { UserInterface } from "@/util/types";

// interface DataTableProps {
//   columns: ColumnDef<UserInterface, any>[];
//   data: UserInterface[];
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
//   setQueryType: React.Dispatch<React.SetStateAction<string>>;
//   search: string;
// }

// export function DataTable({
//   columns,
//   data,
//   setPage,
//   setSearch,
//   setQueryType,
//   search,
// }: DataTableProps) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-x-2">
//           <div className="flex items-center py-4">
//             <Input
//               placeholder="Search..."
//               value={search}
//               onChange={(event) => {
//                 setSearch(event.target.value); // Update search term
//               }}
//               className="max-w-sm"
//             />
//           </div>
//           <div>
//             <Button className="w-full sm:flex items-center gap-x-1 hidden">
//               <Link
//                 className="flex items-center justify-center gap-x-2"
//                 href="/dashboard/createnewuser"
//               >
//                 Add user <Plus />
//               </Link>
//             </Button>
//             <Button className="sm:hidden">
//               <Link
//                 className="flex items-center justify-center gap-x-2"
//                 href="/dashboard/createnewuser"
//               >
//                 <Plus />
//               </Link>
//             </Button>
//           </div>
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="ml-auto hidden sm:block"
//               >
//                 Column
//               </Button>
//               <Button variant="outline" size="sm" className="ml-auto sm:hidden">
//                 <CiViewColumn />
//               </Button>
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Previous page
//           disabled={table.getState().pagination.pageIndex === 1}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setPage((prev) => prev + 1)} // Next page
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </>
//   );
// }

// TODO Above code is working fine

// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { CiViewColumn } from "react-icons/ci";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   ColumnDef,
//   flexRender,
//   SortingState,
//   ColumnFiltersState,
//   VisibilityState,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Plus } from "lucide-react";
// import Link from "next/link";
// import { UserInterface } from "@/util/types";

// interface DataTableProps {
//   columns: ColumnDef<UserInterface, any>[];
//   data: UserInterface[];
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
//   setQueryType: React.Dispatch<React.SetStateAction<string>>;
//   search: string;
//   queryType: string;
// }

// export function DataTable({
//   columns,
//   data,
//   setPage,
//   setSearch,
//   setQueryType,
//   search,
//   queryType,
// }: DataTableProps) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-x-2">
//           <div className="flex items-center py-4">
//             {/* Dropdown for QueryType */}
//             <Select
//               value={queryType}
//               onValueChange={(value) => setQueryType(value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="email">Email</SelectItem>
//                 <SelectItem value="phone">Phone</SelectItem>
//                 <SelectItem value="name">Name</SelectItem>
//               </SelectContent>
//             </Select>

//             <Input
//               placeholder="Search..."
//               value={search}
//               onChange={(event) => {
//                 setSearch(event.target.value); // Update search term
//               }}
//               className="max-w-sm"
//             />
//           </div>
//           <div>
//             <Button className="w-full sm:flex items-center gap-x-1 hidden">
//               <Link
//                 className="flex items-center justify-center gap-x-2"
//                 href="/dashboard/createnewuser"
//               >
//                 Add user <Plus />
//               </Link>
//             </Button>
//             <Button className="sm:hidden">
//               <Link
//                 className="flex items-center justify-center gap-x-2"
//                 href="/dashboard/createnewuser"
//               >
//                 <Plus />
//               </Link>
//             </Button>
//           </div>
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="ml-auto hidden sm:block"
//               >
//                 Column
//               </Button>
//               <Button variant="outline" size="sm" className="ml-auto sm:hidden">
//                 <CiViewColumn />
//               </Button>
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Previous page
//           disabled={table.getState().pagination.pageIndex === 1}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setPage((prev) => prev + 1)} // Next page
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </>
//   );
// }

// data-table.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CiViewColumn } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { UserInterface } from "@/util/type";


interface DataTableProps {
  columns: ColumnDef<UserInterface, any>[];
  data: UserInterface[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setQueryType: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  queryType: string; 
}

export function DataTable({
  columns,
  data,
  setPage,
  setSearch,
  setQueryType,
  search,
  queryType,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div>
            <Select
              value={queryType}
              onValueChange={(value) => setQueryType(value)}
            >
              <SelectTrigger>
                <span>{queryType}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full items-center py-4">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value); 
              }}
              className="max-w-xl"
            />
          </div>
          <div>
            <Button className="w-full sm:flex items-center gap-x-1 hidden">
              <Link
                className="flex items-center justify-center gap-x-2"
                href="/dashboard/createnewuser"
              >
                Add user <Plus />
              </Link>
            </Button>
            <Button className="sm:hidden">
              <Link
                className="flex items-center justify-center gap-x-2"
                href="/dashboard/createnewuser"
              >
                <Plus />
              </Link>
            </Button>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden sm:block"
              >
                Column
              </Button>
              <Button variant="outline" size="sm" className="ml-auto sm:hidden">
                <CiViewColumn />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Previous page
          disabled={table.getState().pagination.pageIndex === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => prev + 1)} // Next page
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
