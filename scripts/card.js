const STORAGE_KEY = 'propertyFavorites';

    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      
      favoriteButtons.forEach((btn) => {
        const cardId = btn.getAttribute('data-card-id');
        if (favorites.includes(cardId)) {
          btn.classList.add('active');
          btn.textContent = '❤️';
        }
      });
    };

    favoriteButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cardId = btn.getAttribute('data-card-id');
        
        let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        if (favorites.includes(cardId)) {
          favorites = favorites.filter((id) => id !== cardId);
          btn.classList.remove('active');
          btn.textContent = '♡';
        } else {
          favorites.push(cardId);
          btn.classList.add('active');
          btn.textContent = '❤️';
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      });
    });

    loadFavorites();