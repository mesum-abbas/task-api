 
 
 
 
 
 const supabase = require("../supabase");

 const authMiddleware = async (req, res, next) => {
   try {
     const authHeader = req.headers.authorization;

     if (!authHeader) {
       return res.status(401).json({
         error: "Access token required",
       });
     }

     const token = authHeader.split(" ")[1];

     const { data, error } = await supabase.auth.getUser(token);

     if (error) {
       return res.status(401).json({
         error: "Invalid or expired token",
       });
     }

     req.user = data.user;

     next();
   } catch (error) {
     res.status(500).json({
       error: error.message,
     });
   }
 };

 module.exports = authMiddleware;
 
 
 
 
 
 
 