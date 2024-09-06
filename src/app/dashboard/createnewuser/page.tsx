"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { userSchema } from "@/schemas/user.schema";
import { UserSchema } from "@/schemas/user.schema";
import Loader from "@/components/loader";
import { useBunnyUpload } from "@/hooks/useBunnyUpload";

const NewUser = () => {
  const { uploadFiles, loading } = useBunnyUpload();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const previews: string[] = [];

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target?.result as string);
        if (previews.length === filesArray.length) {
          setPreviewImages(previews);
        }
      };
      reader.readAsDataURL(file);
    });

    const { imageUrls, error } = await uploadFiles(filesArray);

    if (error) {
      alert(error);
    } else {
      setImageUrls(imageUrls);
      setPreviewImages([]); // Hide preview images after upload
    }
  };

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      sendDetails: false,
      nationality: "",
      gender: "Male",
      spokenLanguage: "",
      bankDetails: "",
      phone: "",
      address: "",
      role: "Owner",
    },
  });

  // TODO Below is the form submission code
  const [loadingg, setLoading] = useState(false);

  const onSubmit = async (data: UserSchema) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/createnewuser", data);
      console.log("User created:", response.data);
      toast({
        title: "User created successfully",
        description: "Please check your email for verification link",
      });
      reset();
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.error,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Button variant="ghost" className="border">
          <Link
            className="flex items-center justify-between gap-x-2"
            href={"/dashboard/user"}
          >
            <ArrowLeftFromLine />
            Dashboard
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-xl w-full m-4">
          <div className="border-2 rounded-lg p-4">
            <div className="border-b">
              <h1 className="text-2xl pb-2 text-center font-semibold">
                Create new user
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <div className="mt-8">
                <Input type="file" multiple onChange={handleFileChange} />
                {loading && <p>Uploading...</p>}
                {previewImages.length > 0 && (
                  <div className="flex space-x-4">
                    {previewImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Preview ${index}`}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    ))}
                  </div>
                )}
                {imageUrls.length > 0 && (
                  <div className="flex space-x-4">
                    {imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 flex flex-col gap-y-4"
            >
              <div className="flex w-full gap-x-2">
                <div className="w-full">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name")}
                    className="w-full"
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className="w-full"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full gap-x-2">
                <div className="w-full">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    {...register("phone")}
                    className="w-full"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <Label htmlFor="gender">Gender</Label>
                  <Select {...register("gender")}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full gap-x-2">
                <div className="w-full">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    {...register("nationality")}
                    className="w-full"
                    placeholder="Enter nationality"
                  />
                  {errors.nationality && (
                    <p className="text-red-500">{errors.nationality.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <Label htmlFor="spokenLanguage">Language</Label>
                  <Input
                    {...register("spokenLanguage")}
                    className="w-full"
                    placeholder="Enter language"
                  />
                  {errors.spokenLanguage && (
                    <p className="text-red-500">
                      {errors.spokenLanguage.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-x-2 justify-between">
                <div className="w-full">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    {...register("address")}
                    className="w-full"
                    placeholder="Enter address"
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full gap-x-2">
                <div className="w-full">
                  <Label htmlFor="bankDetails">Bank Details</Label>
                  <Input
                    {...register("bankDetails")}
                    className="w-full"
                    placeholder="Enter bank details"
                  />
                  {errors.bankDetails && (
                    <p className="text-red-500">{errors.bankDetails.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <Label htmlFor="role">Role</Label>
                  <Select {...register("role")}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="Traveller">Traveller</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-red-500">{errors.role.message}</p>
                  )}
                </div>
              </div>

              <div className="items-top   flex space-x-2">
                <input
                  type="checkbox"
                  {...register("sendDetails")}
                  id="sendDetails"
                  className="text-xl mb-5"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="sendDetails"
                    className="text-sm font-medium leading-none"
                  >
                    Send my registration details to email
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Please check your spam folder to get your details
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loadingg ? <Loader /> : "Continue"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
