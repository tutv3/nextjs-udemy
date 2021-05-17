import { validateEmail } from "../../../utils/validators";

function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !validateEmail(email)) {
      return res.status(422).json({
        msg: "Email is not in valid format"
      });
    }
    return res.json({
      msg: "Registered successfully"
    });
  }
}

export default handler;
