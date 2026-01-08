const showMoreBtn = document.getElementById('showMoreBtn');
const imageModal = document.getElementById('imageModal');
const closeModal = document.getElementById('closeModal');
const body = document.body;

// Open modal
showMoreBtn.addEventListener('click', () => {
    imageModal.classList.add('active');
    body.classList.add('modal-open');
});

// Close modal
closeModal.addEventListener('click', () => {
    imageModal.classList.remove('active');
    body.classList.remove('modal-open');
});

// Close modal by clicking outside
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.classList.remove('active');
        body.classList.remove('modal-open');
    }
});