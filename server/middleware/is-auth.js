module.exports = (req, res) =>{
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
}