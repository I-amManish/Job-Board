import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.user = { id: decoded.userId }; // Standardized to req.user.id
        next();
    } catch (error) {
        console.error("Auth middleware error:", {
            error: error.message,
            token: req.cookies.token
        });

        return res.status(401).json({
            message: "Unauthorized access",
            success: false,
        });
    }
};

export default isAuthenticated;