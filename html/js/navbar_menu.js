// Navbar Responsive
document.getElementById('menu-bar').addEventListener('click', function () {
  console.log('click');
  document.getElementById('section-list').style.display =
    document.getElementById('section-list').style.display == 'none'
      ? 'block'
      : 'none';
});

document
  .getElementById('close-menu-btn')
  .addEventListener('click', function () {
    document.getElementById('section-list').style.display = 'none';
  });
