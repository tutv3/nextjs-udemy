function handler(req, res) {
  const { eventId } = req.body;
  if (req.method === "POST") {
    if (!eventId) {
      return res.status(422).json({
        msg: "Event is not founded"
      });
    }
    return res.json({
      msg: "Registered successfully"
    });
  }
  if (req.method === "GET") {
  }
}

export default handler;
