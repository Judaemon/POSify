// Check if the user is authenticated in the back-end by looking for the meta tag in the head
// meta tag value is initialized in  web.php file
export const checkAuthentication = () => {
  const metaElement = document.querySelector('meta[isAuthenticated]');

  const isAuthenticated = metaElement ? metaElement.getAttribute('isAuthenticated') === '1' : false;

  console.log('Authenticated in back-end', isAuthenticated);

  return isAuthenticated;
};
