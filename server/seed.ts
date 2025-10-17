import { db, pool } from "./db";
import { users, properties } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function main() {
  const adminUsername = process.env.SEED_ADMIN_USERNAME || "admin";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin123456";
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }

  // Ensure admin exists
  const [existing] = await db.select().from(users).where(eq(users.username, adminUsername));
  let adminId: string;
  if (existing) {
    adminId = existing.id;
  } else {
    const hashed = await bcrypt.hash(adminPassword, 10);
    const [created] = await db
      .insert(users)
      .values({ username: adminUsername, password: hashed, role: "admin", email: adminEmail, fullName: "Admin" })
      .returning();
    adminId = created.id;
    // eslint-disable-next-line no-console
    console.log(`Created admin user '${adminUsername}' with temporary password.`);
  }

  // Seed demo properties if none exist
  const existingProps = await db.select().from(properties);
  if (existingProps.length === 0) {
    const demo = [
      {
        title: "Modern Family Home",
        description: "Spacious 4-bedroom home with open floor plan and sunny backyard.",
        price: "850000",
        address: "123 Maple St",
        city: "San Mateo",
        state: "CA",
        zipCode: "94401",
        propertyType: "house",
        status: "available",
        bedrooms: 4,
        bathrooms: "2.5",
        squareFeet: 2150,
        yearBuilt: 1998,
        lotSize: "0.12",
        garage: 2,
        imageUrl: "",
        features: ["hardwood floors", "updated kitchen", "solar"],
        createdBy: adminId,
      },
      {
        title: "Downtown Condo",
        description: "Stylish 2-bed condo with city views and amenities.",
        price: "620000",
        address: "77 Market St Apt 1203",
        city: "San Francisco",
        state: "CA",
        zipCode: "94103",
        propertyType: "condo",
        status: "available",
        bedrooms: 2,
        bathrooms: "1.0",
        squareFeet: 980,
        yearBuilt: 2008,
        lotSize: null as unknown as string,
        garage: 1,
        imageUrl: "",
        features: ["gym", "pool", "concierge"],
        createdBy: adminId,
      },
      {
        title: "Suburban Townhouse",
        description: "Cozy 3-bed townhouse near parks and schools.",
        price: "540000",
        address: "456 Oak Ave",
        city: "Pleasanton",
        state: "CA",
        zipCode: "94566",
        propertyType: "townhouse",
        status: "pending",
        bedrooms: 3,
        bathrooms: "2.0",
        squareFeet: 1350,
        yearBuilt: 2002,
        lotSize: "0.05",
        garage: 2,
        imageUrl: "",
        features: ["patio", "community center"],
        createdBy: adminId,
      },
    ];

    await db.insert(properties).values(demo as any);
    // eslint-disable-next-line no-console
    console.log("Seeded demo properties.");
  } else {
    // eslint-disable-next-line no-console
    console.log("Properties already exist, skipping property seeding.");
  }
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });


