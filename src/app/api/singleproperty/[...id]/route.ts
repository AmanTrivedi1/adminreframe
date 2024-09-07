import { Property } from "@/models/listing";
import { connectDb } from "@/util/db";
import { NextResponse } from "next/server";

// Connect to the database
connectDb();

export async function GET(
  request: Request,
  { params }: { params: { propertyId: string } }
) {
  const { propertyId } = params;

  const id = request

  console.log("Property ID from GET request:", propertyId); // Debugging

  if (!propertyId) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    const property = await Property.findById(propertyId).exec();

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { propertyId: string } }
) {
  const { propertyId } = params;

  console.log("Property ID from PUT request:", propertyId); // Debugging

  if (!propertyId) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
