export async function fetchBookings(productId: number) {
    const res = await fetch(`/api/bookings?product=${productId}`);
    return res.json();
  }
  
  export async function updateBooking(productId: number, date: string, boat: string, slot: string, available: boolean) {
    await fetch(`/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, date, boat, slot, available }),
    });
  }
  