import { NextRequest, NextResponse } from "next/server";
import { and, or, ilike, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const nameParam = url.searchParams.get("name") || "";
  const cityParam = url.searchParams.get("city") || "";
  const specsParam = url.searchParams.get("specialties") || "";
  const page = Math.max(Number(url.searchParams.get("page") || "1"), 1);
  const pageSize = Math.min(Number(url.searchParams.get("pageSize") || "6"), 50);
  const specialties = specsParam.split("#").filter(s => s);

  // Build WHERE clause with Drizzle helpers
  const filters = [];
  if (nameParam) {
    filters.push(
      or(
        ilike(advocates.firstName, `%${nameParam}%`),
        ilike(advocates.lastName, `%${nameParam}%`)
      )
    );
  }
  if (cityParam) {
    filters.push(ilike(advocates.city, `%${cityParam}%`));
  }
  if (specialties.length) {
    // assuming advocates.specialties is a Postgres array column
    filters.push(
      sql.raw(
        `(payload #>> '{}')::jsonb @> $$${JSON.stringify(specialties)}$$`
      )
    );
  }

  // Combine all filters with AND if any
  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  // Total count
  const totalResult = await db
    //@ts-ignore
    .select({ count: sql<number>`COUNT(*)` })
    .from(advocates)
    //@ts-ignore
    .where(whereClause);
  const total = Number(totalResult[0]?.count || 0);

  // Paged data
  const items = await db
    .select()
    .from(advocates)
    //@ts-ignore
    .where(whereClause)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return NextResponse.json({
    data: items,
    total,
    page,
    pageSize,
  });
}
