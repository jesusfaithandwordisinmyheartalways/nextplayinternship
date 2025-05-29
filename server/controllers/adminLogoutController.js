





const AdminLoginOutFunction = async (req, res) => {
    try {
        
      // Destroy session (if using express-session)
      req.session?.destroy((err) => {
        if (err) {
          console.error('Session destroy error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to destroy session.',
          });
        }
  

        // Clear JWT cookie with the correct flags
        res.clearCookie('adminToken', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });
  

        // Optional: Clear session cookie (if used)
        res.clearCookie('connect.sid', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });
  
        return res.status(200).json({ success: true,message: 'Admin has logged out.', })
     });


    } catch (error) {
      console.error('Admin Logout Error:', error);
      return res.status(500).json({ success: false, message: 'Admin logout failed. Please try again.',
      });
    }
  };
  


  export default AdminLoginOutFunction;