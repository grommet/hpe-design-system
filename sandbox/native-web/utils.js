export const toggleThemeMode = element => {
  const handleChange = () => {
    if (element.getAttribute('id') === 'lightMode') {
      element.classList.add('active');
      document.querySelector('#darkMode').classList.remove('active');
      document.documentElement.setAttribute('data-mode', '');
    } else if (element.getAttribute('id') === 'darkMode') {
      element.classList.add('active');
      document.querySelector('#lightMode').classList.remove('active');
      document.documentElement.setAttribute('data-mode', 'dark');
    }
  };

  element?.addEventListener('click', () => handleChange());
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

  element?.addEventListener('click', () => handleChange());
};

export const toggleDrop = (dropButton, dropContent) => {
  const handleChange = () => {
    if (dropContent.getAttribute('class').includes('open')) {
      dropContent.classList.remove('open');
    } else {
      dropContent.classList.add('open');
    }
  };

  const handleDocumentClick = e => {
    if (
      e.target !== dropContent &&
      !dropContent.contains(e.target) &&
      dropContent.getAttribute('class').includes('open') &&
      e.target !== dropButton &&
      !dropButton.contains(e.target)
    ) {
      dropContent.classList.remove('open');
    } else if (e.target === dropButton || dropButton.contains(e.target)) {
      handleChange();
    }
  };

  document?.addEventListener('click', e => handleDocumentClick(e));
};

export const toggleCheckbox = checkbox => {
  const handleChange = () => {
    if (checkbox.getAttribute('aria-checked') === 'false') {
      checkbox.setAttribute('aria-checked', 'true');
    } else {
      checkbox.setAttribute('aria-checked', 'false');
    }
  };

  const handleClick = e => {
    if (e.target === checkbox || checkbox.contains(e.target)) {
      handleChange();
    }
  };

  document?.addEventListener('click', e => handleClick(e));
};
