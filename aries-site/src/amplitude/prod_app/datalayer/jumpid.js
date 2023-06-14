// eslint-disable-next-line consistent-return
export function jumpidGetter (window) {
  try {
    const { search } = window.location;
    const ret = /[?&]jumpid=([^&]+)/.exec(search);
    return ret[1];
  } catch (e) { /* empty */ }
}
