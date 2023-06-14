const DATA_SERVICES_DOMAIN_MATCH = /cds\.hpe\.com$/i;
const DEFAULT_BU = 'unknown-business-unit';

export function getBusinessUnit (domain) {
  if (DATA_SERVICES_DOMAIN_MATCH.test(domain)) {
    return 'data services';
  }
  return `${DEFAULT_BU}:${domain}`;
}
