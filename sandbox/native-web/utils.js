export const toggleThemeMode = element => {
  const handleChange = () => {
    const currentMode = document.documentElement.getAttribute('data-mode');
    // On page load or when changing themes,
    // best to add inline in `head` to avoid FOUC
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // TO DO double check this
    } else {
      document.documentElement.setAttribute(
        'data-mode',
        !currentMode ? 'dark' : '',
      );
    }
  };

  element.addEventListener('click', () => handleChange());
};

export const toggleTheme = element => {
  const handleChange = () => {
    if (element.getAttribute('id') === 'currentTheme') {
      element.classList.add('active');
      document.querySelector('#warmTheme').classList.remove('active');
      document.documentElement.setAttribute('data-theme', '');
    } else if (element.getAttribute('id') === 'warmTheme') {
      element.classList.add('active');
      document.querySelector('#currentTheme').classList.remove('active');
      document.documentElement.setAttribute('data-theme', 'warm');
    }
  };

  element.addEventListener('click', () => handleChange());
};
