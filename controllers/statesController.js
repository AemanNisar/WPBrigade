import { statesData } from "../data/states.js";
export const getStates = (req, res) => {
  try {
    const { country } = req.query;
    if (!country || typeof country !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid country",
      });
    }
    const key = country.toLowerCase();
    const states = statesData[key];
    if (!states) {
      return res.status(404).json({
        success: false,
        message: "State not found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      data: states,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
