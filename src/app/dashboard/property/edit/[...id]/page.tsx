// import { Button } from "@/components/ui/button";
// import { ArrowLeft, ArrowLeftFromLine } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// const page = ({ params }: PageProps) => {
//   return (
//     <>
//       <div>
//         <Button variant="ghost" className="border">
//           <Link
//             className="flex items-center justify-between gap-x-2"
//             href={"/dashboard/property"}
//           >
//             <ArrowLeftFromLine />
//             Back
//           </Link>
//         </Button>
//       </div>
//       <div>{params.id}</div>
//     </>
//   );
// };

// export default page;

"use client";



import React, { useEffect } from "react"
import { useForm, Controller, FormProvider } from "react-hook-form"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeftFromLine } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: {
    id: string
  }
}

interface PropertyFormData {
  VSID: string
  basePrice: string
  bathroom: string
  bedrooms: string
  beds: string
  center: {
    lat: string
    lng: string
  }
  childrenAge: string
  city: string
  cooking: string
  country: string
  currency: string
  additionalRules: string
}

const PropertyPage = ({ params }: PageProps) => {
  const { id } = params

  const methods = useForm<PropertyFormData>({
    defaultValues: {
      VSID: "",
      basePrice: "",
      bathroom: "",
      bedrooms: "",
      beds: "",
      center: { lat: "", lng: "" },
      childrenAge: "",
      city: "",
      cooking: "",
      country: "",
      currency: "",
      additionalRules: "",
    },
  })

  const { control, handleSubmit, setValue, reset, formState: { errors } } = methods

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`/api/singleproperty/${id}`)
        reset(response.data)
        console.log(response)
        console.log(response.data)
      } catch (error) {
        console.error("Failed to fetch property data:", error)
      }
    }

    if (id) {
      fetchPropertyData()
    }
  }, [id, reset])

  const onSubmit = async (data: PropertyFormData) => {
    try {
      await axios.put(`/api/singleproperty/${id}`, {
        ...data,
        basePrice: data.basePrice.split(",").map((v) => parseFloat(v.trim())),
        bathroom: data.bathroom.split(",").map((v) => parseInt(v.trim(), 10)),
        bedrooms: data.bedrooms.split(",").map((v) => parseInt(v.trim(), 10)),
        beds: data.beds.split(",").map((v) => parseInt(v.trim(), 10)),
        childrenAge: data.childrenAge.split(",").map((v) => parseInt(v.trim(), 10)),
        additionalRules: data.additionalRules.split(",").map((v) => v.trim()),
      })
      alert("Property updated successfully")
    } catch (error) {
      console.error("Failed to update property:", error)
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="p-4">
        <Button variant="outline" className="border mb-4">
          <Link className="flex items-center gap-x-2" href="/dashboard/property">
            <ArrowLeftFromLine />
            Back
          </Link>
        </Button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="VSID" className="block text-sm font-medium">VSID</label>
            <Controller
              name="VSID"
              control={control}
              rules={{ required: "VSID is required" }}
              render={({ field }) => (
                <Input
                  id="VSID"
                  placeholder="Enter VSID"
                  className="mt-1 block w-full"
                  {...field}
                />
              )}
            />
            {errors.VSID && <p className="text-sm text-red-500">{errors.VSID.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="basePrice" className="block text-sm font-medium">Base Price (per night)</label>
            <Controller
              name="basePrice"
              control={control}
              rules={{ required: "Base Price is required" }}
              render={({ field }) => (
                <Input
                  id="basePrice"
                  placeholder="Enter base price"
                  className="mt-1 block w-full"
                  {...field}
                />
              )}
            />
            {errors.basePrice && <p className="text-sm text-red-500">{errors.basePrice.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input
                  id="city"
                  placeholder="Enter city"
                  className="mt-1 block w-full"
                  {...field}
                />
              )}
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Input
                  id="country"
                  placeholder="Enter country"
                  className="mt-1 block w-full"
                  {...field}
                />
              )}
            />
            {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="cooking" className="block text-sm font-medium">Cooking</label>
            <Controller
              name="cooking"
              control={control}
              rules={{ required: "Cooking policy is required" }}
              render={({ field }) => (
                <Input
                  id="cooking"
                  placeholder="Enter cooking policy"
                  className="mt-1 block w-full"
                  {...field}
                />
              )}
            />
            {errors.cooking && <p className="text-sm text-red-500">{errors.cooking.message}</p>}
          </div>

         
          
          <div className="mb-4">
            <Button type="submit" className="px-4 py-2">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}

export default PropertyPage
