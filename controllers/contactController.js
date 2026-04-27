import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("data/messages.json");

export const submitContact = async (req, res) => {
  try {
    const { name, email, country, state, message } = req.body;

    //  Basic validation
    if (!name || !email || !country || !state || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  Read existing data
    let messages = [];

    try {
      const file = await fs.readFile(filePath, "utf-8");
      messages = JSON.parse(file);
    } catch {
      messages = [];
    }

    //  Create new entry
    const newMessage = {
      id: Date.now(),
      name,
      email,
      country,
      state,
      message,
      createdAt: new Date(),
    };

    messages.push(newMessage);

    //  Save back to file
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2));

    //  Response
    res.json({
      success: true,
      message: "Message received!",
    });
  } catch (err) {
    console.error("Contact error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
