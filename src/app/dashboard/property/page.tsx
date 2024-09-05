"use client";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import debounce from "lodash.debounce";
import { Button } from "@/components/ui/button";

interface Property {
  _id: string;
  placeName: string;
  email: string;
  VSID: string;
  propertyCoverFileUrl: string;
  beds: [number];
  basePrice: [number];
  numberOfPortions: number;
  state: string;
  isLive: boolean;
}

interface ApiResponse {
  data: Property[];
  totalPages: number;
}

const PropertyPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("email");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit: number = 10;

  const fetchProperties = useCallback(
    debounce(async (searchTerm: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/getallproperty?page=${page}&limit=${limit}&searchTerm=${searchTerm}&searchType=${searchType}`
        );
        const data: ApiResponse = await response.json();
        if (response.ok) {
          setProperties(data.data);
          setTotalPages(data.totalPages);
        } else {
          throw new Error("Failed to fetch properties");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 500),
    [page, searchType, limit]
  );

  useEffect(() => {
    fetchProperties(searchTerm);
  }, [fetchProperties, searchTerm]);

  console.log(properties);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPaginationItems = () => {
    let items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={page === i}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div>
      {/* Search and filter section */}
      <div className="flex lg:mt-0 mt-2 items-center gap-x-2">
        <div className="sm:max-w-[180px] max-w-[100px] w-full">
          <Select
            onValueChange={(value: string) => setSearchType(value)}
            value={searchType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="VSID">VSID</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full items-center py-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="max-w-xl"
          />
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className=" mb-4">
            <div className="grid gap-4 mb-4 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {properties.map((property) => (
                <Card
                  key={property._id}
                  className="shadow-md sm:max-w-[400px]  max-w-[300px] rounded-lg"
                >
                  <CardHeader className="p-0 border-b">
                    <div>
                      <img
                        src={property.propertyCoverFileUrl}
                        alt="PropertyImage"
                        className="w-full h-[180px]  object-fill flex items-center justify-center rounded-t-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 ">
                    <div className="flex items-center justify-between">
                      <p className="">Vsid {property.VSID}</p>
                      <p className="">Beds {property.beds.length || "NA"}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-xl">€{property.basePrice[0]}/night</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="">State: {property.state || "NA"}</p>
                      {property.isLive ? (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                        </span>
                      ) : (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="-mr-4">
                    <Button>Edit</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) handlePageChange(page - 1);
                    }}
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) handlePageChange(page + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
