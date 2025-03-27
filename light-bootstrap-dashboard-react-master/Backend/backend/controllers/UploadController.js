const Attachment = require("../model/Attachment");

const uploadFile = async (req, res) => {
  try {
    const { ticket_id, user_id } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = `/uploads/${file.filename}`;

    // Save file info in the database
    await Attachment.saveFile({
      fileName: file.filename,
      filePath,
      fileType: file.mimetype,
      fileSize: file.size,
      ticketId: ticket_id,
      userId: user_id,
    });

    res.status(200).json({ message: "File uploaded successfully", filePath });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { uploadFile };
