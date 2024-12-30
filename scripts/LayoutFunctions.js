async function onLoad() {
  const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    loadingScreen.style.opacity = '0';

    setTimeout(() => {
      loadingScreen.style.display = 'none';
      content.style.opacity = '1';

      document.body.style.opacity = '1';
      document.body.style.backgroundImage = 'radial-gradient(#373a38 1.35px, #0B110C 1.35px)';
      document.body.style.backgroundSize = '25px 25px';
      document.body.style.backgroundColor = '#0B110C';
    }, 200);
}