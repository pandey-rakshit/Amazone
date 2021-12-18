exports.get404 = (req, res) => {
  res.status(404).render('pagenotfound', {
    pageTitle: 'Page Not Found',
    path: '/pagenotfound',
    isAuthenticated: req.session.isLoggedIn
  });
};
