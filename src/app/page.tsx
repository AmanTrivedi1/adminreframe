"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";


export default function HomePage() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-10">
      <Link href="/dashboard/user">
        <Card className="w-64 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Section 1</CardTitle>
            <CardDescription>Manage Section 1</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </Link>
      <Link href="/dashboard/">
        <Card className="w-64 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Section 2</CardTitle>
            <CardDescription>Manage Section 2</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </Link>
      <Link href="/dashboard/section3">
        <Card className="w-64 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Section 3</CardTitle>
            <CardDescription>Manage Section 3</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </Link>
      <Link href="/dashboard/section4">
        <Card className="w-64 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Section 4</CardTitle>
            <CardDescription>Manage Section 4</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </Link>
    </div>
  );
}
