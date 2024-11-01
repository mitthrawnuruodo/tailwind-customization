// toggle.js
function setTheme(theme) {
  const html = document.documentElement;
  
  // Clear any existing theme classes
  html.classList.remove('light', 'dark');
  
  // Apply the theme class if it's light or dark
  if (theme === 'dark') {
    html.classList.add('dark');
  } else if (theme === 'light') {
    html.classList.add('light');
  } else {
    // "system" mode - set based on system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      html.classList.add('dark');
    } else {
      html.classList.add('light');
    }
  }
  
  // Save the theme selection in localStorage unless it’s "system" mode
  if (theme !== 'system') {
    localStorage.setItem('theme', theme);
  } else {
    localStorage.removeItem('theme'); // "system" mode clears user preference
  }
  
  // Update the button text to reflect the current theme
  updateToggleButtonText(theme);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    setTheme('dark');
  } else if (savedTheme === 'light') {
    setTheme('light');
  } else {
    setTheme('system');
  }
}

// Update the toggle button text based on the current theme
function updateToggleButtonText(theme) {
  const themeToggleButton = document.getElementById('theme-toggle');
  if (theme === 'dark') {
    themeToggleButton.textContent = 'Dark Mode';
  } else if (theme === 'light') {
    themeToggleButton.textContent = 'Light Mode';
  } else {
    themeToggleButton.textContent = 'System Mode';
  }
}

// Theme toggle button click handler
document.getElementById('theme-toggle').addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme');
  // Cycle through themes: dark → light → system
  if (currentTheme === 'dark') {
    setTheme('light');
  } else if (currentTheme === 'light') {
    setTheme('system');
  } else {
    setTheme('dark');
  }
});

// Initialize theme on page load
initializeTheme();
