"use client";
import { useState, useEffect, FormEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { Property, propertyTypes, rentalTypes } from "@/util/type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoRemoveSharp } from "react-icons/io5";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Loader from "@/components/loader";
import { Checkbox } from "@/components/ui/checkbox";

interface PageProps {
  params: {
    id: string;
  };
}

const EditPropertyPage = ({ params }: PageProps) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [numberOfPortions, setNumberOfPortions] = useState<number>(1);

  useEffect(() => {
    if (params.id) {
      const fetchProperty = async () => {
        setLoading(true);
        try {
          const response = await axios.post("/api/singleproperty/getproperty", {
            propertyId: params.id,
          });
          console.log(response.data);
          setProperty(response.data);
          setNumberOfPortions(response.data.basePrice.length);
          setLoading(false);
        } catch (error: any) {
          console.error("Error fetching property:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [params.id]);

  // const [formData, setFormData] = useState<Partial<Property>>({
  const [formData, setFormData] = useState<Partial<Property>>({
    VSID: property?.VSID,
    rentalType: property?.rentalType,

    propertyType: property?.propertyType,
    placeName: property?.placeName,
    rentalForm: property?.rentalForm,
    numberOfPortions: property?.numberOfPortions,

    street: property?.street,
    postalCode: property?.postalCode,
    city: property?.city,
    state: property?.state,
    country: property?.country,

    portionName: property?.portionName,
    portionSize: property?.portionSize,
    guests: property?.guests,
    bedrooms: property?.bedrooms,
    beds: property?.beds,
    bathroom: property?.bathroom,
    kitchen: property?.kitchen,
    childrenAge: property?.childrenAge,

    basePrice: property?.basePrice,
    weekendPrice: property?.weekendPrice,
    monthlyDiscount: property?.monthlyDiscount,

    generalAmenities: property?.generalAmenities,
    otherAmenities: property?.otherAmenities,
    safeAmenities: property?.safeAmenities,

    smoking: property?.smoking,
    pet: property?.pet,
    party: property?.party,
    cooking: property?.cooking,
    additionalRules: property?.additionalRules,

    reviews: property?.reviews,

    propertyCoverFileUrl: property?.propertyCoverFileUrl,
    propertyPictureUrls: property?.propertyPictureUrls,
    portionCoverFileUrls: property?.portionCoverFileUrls,
    portionPictureUrls: property?.portionPictureUrls,

    night: property?.night,
    time: property?.time,
    datesPerPortion: property?.datesPerPortion,

    isLive: property?.isLive,
  });

  useEffect(() => {
    if (property) {
      setFormData({
        VSID: property.VSID,
        rentalType: property.rentalType,

        propertyType: property.propertyType,
        placeName: property.placeName,
        rentalForm: property.rentalForm,
        numberOfPortions: property.numberOfPortions,

        street: property.street,
        postalCode: property.postalCode,
        city: property.city,
        state: property.state,
        country: property.country,

        portionName: property.portionName,
        portionSize: property.portionSize,
        guests: property.guests,
        bedrooms: property.bedrooms,
        beds: property.beds,
        bathroom: property.bathroom,
        kitchen: property.kitchen,
        childrenAge: property.childrenAge,

        basePrice: property.basePrice,
        weekendPrice: property.weekendPrice,
        monthlyDiscount: property.monthlyDiscount,

        generalAmenities: property.generalAmenities,
        otherAmenities: property.otherAmenities,
        safeAmenities: property.safeAmenities,

        smoking: property.smoking,
        pet: property.pet,
        party: property.party,
        cooking: property.cooking,
        additionalRules: property.additionalRules,

        reviews: property.reviews,

        night: property.night,
        time: property.time,
        datesPerPortion: property.datesPerPortion,

        isLive: property.isLive,
      });
    }
  }, [property]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const trimmedValue = value.trim();
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : trimmedValue,
    }));
  };

  // TODO for handling the addition rule
  // Add new rule to additionalRules array
  const handleAddRule = () => {
    setFormData((prevState) => ({
      ...prevState,
      additionalRules: [...(prevState.additionalRules || []), ""],
    }));
  };

  // Update a specific rule
  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...(formData.additionalRules || [])];
    updatedRules[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      additionalRules: updatedRules,
    }));
  };

  // Remove a rule from additionalRules array
  const handleRemoveRule = (index: number) => {
    const updatedRules = [...(formData.additionalRules || [])];
    updatedRules.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      additionalRules: updatedRules,
    }));
  };

  const handlegeneralAmenties = () => {
    formData?.generalAmenities &&
      Object.entries(formData.generalAmenities)?.map(([key, value]) =>
        console.log(key, value)
      );
  };

  useEffect(() => {
    console.log("called");
    handlegeneralAmenties();
  }, [formData]);

  const [isPortionOpen, setIsPortionOpen] = useState<boolean[]>(() =>
    Array.from({ length: numberOfPortions }, () => false)
  );

  return (
    <div className="max-w-6xl p-2 mx-auto ">
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <Loader />
        </div>
      ) : (
        <form
          onSubmit={() => {
            console.log("ssjk");
          }}
        >
          <Link href="/dashboard/property">
            <Button className="flex gap-x-1" variant="outline">
              <HiArrowNarrowLeft /> Back
            </Button>
          </Link>

          <h1 className="text-3xl mt-2  mb-4"> Edit Property</h1>
          <div className="flex sm:border rounded-lg sm:p-4 flex-col gap-x-2 gap-y-4 mt-4">
            <div className="">
              <label>
                VSID
                <Input
                  type="text"
                  name="VSID"
                  value={formData?.VSID || ""}
                  onChange={handleChange}
                  disabled
                />
              </label>
            </div>
            <div className="flex items-center sm:flex-row flex-col justify-between gap-x-2 w-full ">
              <div className="w-full">
                <h1 className="">Property Type</h1>
                <Select
                  name="propertyType"
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "propertyType", value } })
                  }
                >
                  <SelectTrigger className="text-black dark:text-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <label className=" ">
                  Place Name
                  <Input
                    type="text"
                    name="placeName"
                    value={formData?.placeName || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center sm:flex-row flex-col justify-between gap-x-2 w-full ">
              <div className="w-full">
                <label>
                  <h1 className="">Rental Form</h1>
                  <Input
                    type="text"
                    name="rentalType"
                    value={formData?.rentalForm || "Not Found"}
                    onChange={handleChange}
                    disabled
                  />
                </label>
              </div>
              <div className="w-full">
                <h1 className="">Rental Type</h1>
                <Input
                  type="text"
                  name=""
                  value={formData?.rentalType || "Not Found"}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="flex items-center sm:flex-row flex-col justify-between gap-x-2 w-full ">
              <div className="w-full">
                <label>
                  <h1 className="">Postal Code</h1>
                  <Input
                    type="text"
                    name="postalCode"
                    value={formData?.postalCode || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <h1 className="">City</h1>
                  <Input
                    type="text"
                    name="city"
                    value={formData?.city || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center sm:flex-row flex-col justify-between gap-x-2 w-full ">
              <div className="w-full">
                <label>
                  <h1 className="">State</h1>
                  <Input
                    type="text"
                    name="state"
                    value={formData?.state || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="w-full">
                <label>
                  Country
                  <Input
                    type="text"
                    name="country"
                    value={formData?.country || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center sm:flex-row flex-col justify-between gap-x-2 w-full ">
              <div className="w-full">
                <label>
                  <h1 className="">Street</h1>
                  <Input
                    type="text"
                    name="street"
                    value={formData?.street || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <h1 className="">Pet Friendly</h1>
                  <Input
                    type="text"
                    name="pet"
                    value={formData?.pet || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center sm:flex-row flex-col justify-between gap-x-2 w-full ">
              <div className="w-full">
                <label>
                  <h1 className="">Party Friendly</h1>
                  <Input
                    type="text"
                    name="party"
                    value={formData?.party || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <h1 className="">Cooking</h1>
                  <Input
                    type="text"
                    name="cooking"
                    value={formData?.cooking || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="w-full my-4">
              <h1 className="text-xl mb-2 font-medium dark:text-white">
                Additional Rules
              </h1>

              {/* Render each additional rule with a remove button */}
              {formData.additionalRules?.map((rule, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    className="w-full p-2 text-base border rounded-lg "
                    placeholder={`Rule ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveRule(index)}
                    className=""
                  >
                    <IoRemoveSharp />
                  </Button>
                </div>
              ))}
              <p className="text-xs mb-4 mt-2">
                If you want to edit the additionalRules you can directly edit in
                the input box above no need to save it just edit and leave.
              </p>
              <Button type="button" onClick={handleAddRule} className="">
                Add section
              </Button>
            </div>

            <Popover>
              <PopoverTrigger>Edit Amenties</PopoverTrigger>

              <PopoverContent className="">
                <div className="flex items-center gap-x-2 flex-wrap">
                  <h1>General Amenities</h1>

                  {formData?.generalAmenities &&
                    Object.entries(formData?.generalAmenities)?.map(
                      ([key, value]) => (
                        <div key={key} className="flex  items-center gap-x-1 ">
                          <h1>{key}</h1>
                          <Checkbox checked={value} />
                        </div>
                      )
                    )}
                </div>
              </PopoverContent>
            </Popover>

            <div>
              <label>
                <h1 className="">Smoking</h1>
                <Input
                  type="text"
                  name="smoking"
                  value={formData?.smoking || ""}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="flex border px-4 py-2 rounded-lg items-center space-x-4">
                <div className="flex items-center justify-between  w-full">
                  <h1 className="">Tap to live/Hide</h1>
                  <div className="relative hover:cursor-pointer block">
                    <input
                      type="checkbox"
                      name="isLive"
                      checked={formData.isLive || false}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500    transition duration-300 ease-in-out"></div>
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 peer-checked:translate-x-full transition-transform duration-300 ease-in-out"></div>
                  </div>
                </div>
              </label>
            </div>
            {Array.from({
              length: numberOfPortions,
            }).map((item, index) => {
              return (
                <div className=" flex  flex-col space-y-4 my-4" key={index}>
                  <h1
                    className="  flex items-center transition-transform duration-300 ease-in-out cursor-pointer  border px-4 py-2 rounded-lg "
                    onClick={() =>
                      setIsPortionOpen((prev) => {
                        const newIsPortionOpen = [...prev];
                        newIsPortionOpen[index] = !newIsPortionOpen[index];
                        return newIsPortionOpen;
                      })
                    }
                  >
                    Portion no {index + 1}{" "}
                    {isPortionOpen[index] ? (
                      <MdArrowDropDown className="text-2xl" />
                    ) : (
                      <MdArrowRight className="text-2xl" />
                    )}
                  </h1>
                  {isPortionOpen[index] && (
                    <div className=" flex flex-col space-y-4">
                      <div>
                        <label className="text-xs" htmlFor="portionName">
                          Portion&apos;s Name
                          <Input
                            type="text"
                            name="cooking"
                            value={formData?.portionName?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.portionName?.splice(
                                index,
                                1,
                                e.target.value
                              );
                              setFormData(newFormData);
                            }}
                          />
                        </label>
                      </div>

                      <div className=" flex space-x-4">
                        <div>
                          <label className="text-xs" htmlFor="portionSize">
                            Portion&apos;s Size
                            <Input
                              type="number"
                              min={0}
                              name="portionSize"
                              value={formData?.portionSize?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.portionSize?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label className="text-xs" htmlFor="guests">
                            Number Of Guests
                            <Input
                              type="number"
                              name="guests"
                              min={0}
                              value={formData?.guests?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.guests?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label className="text-xs" htmlFor="bedrooms">
                            Number Of Bedrooms
                            <Input
                              type="number"
                              name="bedrooms"
                              min={0}
                              value={formData?.bedrooms?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.bedrooms?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label className="text-xs" htmlFor="beds">
                            Number Of Beds
                            <Input
                              type="number"
                              name="beds"
                              min={0}
                              value={formData?.beds?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.beds?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label className="text-xs" htmlFor="bathroom">
                            Number Of Bathrooms
                            <Input
                              type="number"
                              name="bathroom"
                              min={0}
                              value={formData?.bathroom?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.bathroom?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className=" flex space-x-4">
                        <div>
                          <label className="text-xs" htmlFor="kitchen">
                            Number Of Kitchen
                            <Input
                              type="number"
                              name="kitchen"
                              min={0}
                              value={formData?.kitchen?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.kitchen?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label className="text-xs" htmlFor="childrenAge">
                            Children&apos;s Age
                            <Input
                              type="number"
                              name="childrenAge"
                              min={0}
                              value={formData?.childrenAge?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.childrenAge?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label className="text-xs" htmlFor="basePrice">
                            Base Price Of Portion {index + 1}
                            <Input
                              type="number"
                              name="basePrice"
                              min={0}
                              value={formData?.basePrice?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.basePrice?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>
                        <div>
                          <label className="text-xs" htmlFor="weekendPrice">
                            Weekend Price Of Portion {index + 1}
                            <Input
                              type="number"
                              min={0}
                              name="weekendPrice"
                              value={formData?.weekendPrice?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.weekendPrice?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label className="text-xs" htmlFor="monthlyDiscount">
                            Monthly Discount For Portion {index + 1}
                            <Input
                              type="number"
                              min={0}
                              name="monthlyDiscount"
                              value={formData?.monthlyDiscount?.at(index) || ""}
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                newFormData?.monthlyDiscount?.splice(
                                  index,
                                  1,
                                  parseInt(e.target.value)
                                );
                                setFormData(newFormData);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className=" flex mt-4">
            <Button type="submit"> Save Changes</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPropertyPage;
