document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const listContainer = document.getElementById('copywriters-list');
            data.forEach(person => {
                const card = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="images/${person.image}" class="card-img-top" alt="${person.name}">
                            <div class="card-body">
                                <h5 class="card-title">${person.name}</h5>
                                <p class="card-text">محل کار: ${person.workplace}</p>
                                <a href="${person.socialMedia}" class="btn btn-primary" target="_blank">آیدی سوشال مدیا</a>
                            </div>
                        </div>
                    </div>
                `;
                listContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});