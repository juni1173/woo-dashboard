import { NextResponse } from "next/server";

let bookings: { productId: number; date: string; boat: string; slot: string; available: boolean }[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product");
  if (!productId) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

  const productBookings = bookings.filter((b) => b.productId === Number(productId));
  return NextResponse.json(productBookings);
}

export async function POST(request: Request) {
  const { productId, date, boat, slot, available } = await request.json();
  if (!productId || !date || !boat || !slot) {
    return NextResponse.json({ error: "Missing booking data" }, { status: 400 });
  }

  const existingIndex = bookings.findIndex(
    (b) => b.productId === productId && b.date === date && b.boat === boat && b.slot === slot
  );

  if (existingIndex !== -1) {
    bookings[existingIndex].available = available;
  } else {
    bookings.push({ productId, date, boat, slot, available });
  }

  return NextResponse.json({ message: "Booking updated", bookings });
}
