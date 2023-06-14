import { getBusinessUnit } from './business_unit';

function cleanPathname (pathname) {
  return pathname
    .replace(/^\//, '')
    .replace(/\//g, ':');
}

export function buildPageDatalayer (window) {
  const { hostname } = window.location;
  const { href, protocol, host, pathname } = window.location;

  const businessUnit = getBusinessUnit(hostname);
  const siteSection = `${businessUnit}`;
  let pathBreadcrumb = pathname
    .replace(/\/+/g, ':')
    .replace(/#.*$/, '')
    .replace(/^:+/, '')
    .replace(/:+$/, '');
  pathBreadcrumb = pathBreadcrumb.length < 2
    ? 'main'
    : cleanPathname(pathBreadcrumb);
  const breadCrumbs = [siteSection, pathBreadcrumb];
  const pageName = breadCrumbs.join(':');
  return {
    pageInfo: {
      breadCrumbs,
      pageName,
      siteSection,
      business_unit: businessUnit,
      title: window.document.title,
      full_url: href,
      uri: {
        protocol,
        domain: host,
        pathname,
      },
    },
  };
}
