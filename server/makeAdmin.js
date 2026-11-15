require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const user = await User.findOneAndUpdate(
      { email: "keshav@test.com" },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
    } else {
      console.log("Admin role added successfully ✅");
      console.log("Name:", user.name);
      console.log("Email:", user.email);
      console.log("Role:", user.role);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.log("Error:", error);
    await mongoose.disconnect();
  }
}

makeAdmin();