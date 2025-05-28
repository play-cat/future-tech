const menuLinks = document.querySelectorAll('.header__menu-link');

const headerMenuChangeActiveLink = () => {
  // const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
  const currentPath = window.location.pathname.replace(/^.*\//, '');
  menuLinks.forEach(menuLink => {
    const href = menuLink.getAttribute('href');

    if (!href) return;

    const linkPath = href.slice(1).replace(/^\/|\/$/g, '');

    if (linkPath === currentPath) {
      menuLink.classList.add('is-active');
    } else {
      menuLink.classList.remove('is-active');
    }
  });
};

export default headerMenuChangeActiveLink;
