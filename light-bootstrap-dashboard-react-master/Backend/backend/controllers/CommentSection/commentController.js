const Comment = require('../../model/commentModel');

exports.addComment = async (req, res) => {
  const { comment, Ticket_id, user_id } = req.body;
  const file = req.file;
 
  console.log("✅ Extracted Data:", { comment, Ticket_id, user_id });

  if (!comment || !Ticket_id || !user_id) {

    return res.status(400).json({ message: "Missing required fields" });

  }
  const filePath = file ? file.path : null;
  const fileType = file ? file.mimetype : null;

  try {
    const result = await Comment.addComment(comment, Ticket_id, user_id,filePath,fileType );

    console.log("🟢 Comment added successfully with ID:", result.insertId);

    res.status(201).json({
      message: "✅ Comment added successfully.",
      comment_id: result.insertId,  // Returning the new comment ID
      ticket_id: Ticket_id,
      user_id: user_id,
      comment: comment,
      file_path: filePath, // Include uploaded file path
      file_type: fileType,
    });
  } catch (err) {
    console.error("❌ Error inserting comment:", err);

    if (err.message.includes("Foreign key constraint failed")) {
      return res.status(400).json({ message: "Invalid ticket ID or user ID." });
    }

    res.status(500).json({ message: "Internal server error while adding comment." });
  }
};

exports.getComments = async (req, res) => {
  console.log("➡️ Received request to fetch comments");

  const { ticket_id } = req.query;
  console.log("🔍 Ticket ID:", ticket_id);

  try {
    const results = await Comment.getCommentsByTicket(ticket_id);

    // Modify file path to be publicly accessible
    const formattedResults = results.map(comment => ({
      ...comment,
      file_url: comment.File_path
        ? `http://localhost:3000/${comment.File_path.replace(/\\/g, "/")}`
        : null
    }));

    res.status(200).json(formattedResults);
  } catch (err) {
    console.error("❌ Error fetching comments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
