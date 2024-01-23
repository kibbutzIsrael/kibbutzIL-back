import { describe, it, expect } from "vitest";
import request from "supertest";

describe("Volunteer Routes", () => {
//   it("POST /volunteers should create a new volunteer", async () => {
//     const newVolunteerData = {
//       fullName: "Test User",
//       email: "testuser@example.com",
//       location: "Test City",
//       phoneNumber: "1234567890",
//       gender: "Non-Binary",
//       positionUntilNow: "Test Position",
//       fecerPosition: "Test Fecer Position",
//       yearExperience: "2 years",
//     };
//     const response = await request("http://localhost:3000")
//       .post("/volunteers")
//       .send(newVolunteerData);
//     console.log("Response Status:", response.statusCode);

//     expect(response.statusCode).toBe(201);
//   });

  it("GET /volunteers should return all volunteers", async () => {
    const response = await request("http://localhost:3000").get("/volunteers");

    expect(response.statusCode).toBe(200);
  });

  it("GET /volunteers/:id should return 404 for a non-existing id", async () => {
    const nonExistingId = "65ad0b7a91a2b012c02eb043";
    const response = await request("http://localhost:3000").get(
      `/volunteers/${nonExistingId}`
    );
    console.log("res", response.statusCode)
    expect(response.statusCode).toBe(404);
  });
});
