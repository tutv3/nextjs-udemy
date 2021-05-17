import path from "path";
import fs from "fs";

const buildFeedbackPath = () =>
  path.join(process.cwd(), "data", "feedback.json");

const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

const saveFeedback = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

function getFeedback(req, res) {
  if (req.method === "POST") {
    const { email, feedback } = req.body;
    if (feedback && email) {
      const newFeedback = {
        id: Math.random().toString(),
        email,
        feedback
      };
      const filePath = buildFeedbackPath();
      const data = extractFeedback(filePath);
      data.push(newFeedback);
      saveFeedback(filePath, data);
      return res.json({
        msg: email + " is giving feedback successfully",
        feedback: newFeedback
      });
    } else {
      return res.status(400).json({ msg: "Pls provide feedback & email" });
    }
  } else {
    return res.json({
      feedbacks: extractFeedback(buildFeedbackPath())
    });
  }
}

export default getFeedback;
