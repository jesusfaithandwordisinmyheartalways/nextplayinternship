







const AdminLoginOutFunction = async (req, res) =>{
    try {
        res.clearCookie('adminToken')
        req.session = null;
        res.status(200).json({success: true, message: 'Admin Has Logout'})

    }catch(error) {
        console.error('Admin Logout Error', error)
        return res.status(500).json({ success: false, message: 'Admin Logout Failed to Log out. Please try again.'})

    }
}



export default AdminLoginOutFunction