const toggleBtn = document.getElementById('toggleText');
const section = document.querySelector('.shoreline-info');

toggleBtn.addEventListener('click', () => {
  section.classList.toggle('expanded');

  toggleBtn.textContent = section.classList.contains('expanded')
    ? 'SHOW LESS'
    : 'SHOW MORE';
});
