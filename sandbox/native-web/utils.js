export const toggleTheme = element => {
  const handleChange = () => {
    const currentMode = document.documentElement.getAttribute('data-theme');
    // On page load or when changing themes,
    // best to add inline in `head` to avoid FOUC
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // TO DO double check this
    } else {
      document.documentElement.setAttribute(
        'data-theme',
        !currentMode ? 'dark' : '',
      );
    }
  };

  element.addEventListener('click', () => handleChange());
};
