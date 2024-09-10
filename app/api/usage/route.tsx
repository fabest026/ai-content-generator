// /app/api/usage/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/utils/db'; // Drizzle DB
import { aiOuput } from '@/utils/schema'; // Ensure schema is correctly imported
import { eq } from 'drizzle-orm';
import { getAuth } from '@clerk/nextjs/server'; // Import Clerk server-side methods

export async function GET(req: Request) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    // Fetch usage history from the database
    const result = await db
      .select()
      .from(aiOuput)
      .where(eq(aiOuput.createdBy, userId));

    // Return the data as JSON
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Error fetching data', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
