async function searchMovie() {
    const movieName = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
  
    if (!movieName) {
      resultDiv.innerHTML = '<p>Please enter a movie name</p>';
      return;
    }
  
    const apiKey = '6480d078'; // 🔑 Get one from http://www.omdbapi.com/apikey.aspx
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

  
    try {
      resultDiv.innerHTML = '<p>Loading...</p>';
      const res = await fetch(url);
      const data = await res.json();
  
      if (data.Response === 'False') {
        resultDiv.innerHTML = `<p>❌ ${data.Error}</p>`;
      } else {
        resultDiv.innerHTML = `
          <div class="movie-card">
            <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/100'}" />
            <div>
              <h2>${data.Title} (${data.Year})</h2>
              <p><strong>Genre:</strong> ${data.Genre}</p>
              <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
              <p>${data.Plot}</p>
            </div>
          </div>
        `;
      }
    } catch (err) {
      resultDiv.innerHTML = '<p>Something went wrong. Try again!</p>';
    }
  }
  async function showDetails(imdbID) {
    const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
    const data = await res.json();
  
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
      <h2>${data.Title} (${data.Year})</h2>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Director:</strong> ${data.Director}</p>
      <p><strong>Actors:</strong> ${data.Actors}</p>
      <p><strong>Plot:</strong> ${data.Plot}</p>
      <button onclick="closeModal()">Close</button>
    `;
  
    document.getElementById('modal').classList.remove('hidden');
  }
  
  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }
  
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });
  
  