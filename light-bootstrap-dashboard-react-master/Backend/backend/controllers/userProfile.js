const User = require("../model/user");

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.query.id; // Get ID from query parameter

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.body.id;
        console.log("User ID received:", userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch the existing user data (to keep email unchanged)
        const existingUser = await User.findUserById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get updated fields, or keep the existing values
        const name = req.body.name || existingUser.name;
        const aboutMe = req.body.aboutMe || existingUser.about_me;
        const profileImage = req.body.profileImage || existingUser.profile_image;

        // Call the model function to update the user (without modifying email)
        await User.updateUserProfile(userId, name, aboutMe, profileImage);

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

