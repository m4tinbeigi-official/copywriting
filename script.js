document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const copywritersList = document.getElementById('copywriters-list');

    // بارگذاری داده‌ها از فایل JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayCopywriters(data);

            // افزودن قابلیت جستجو
            searchInput.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                const filteredData = data.filter(person =>
                    person.name.toLowerCase().includes(searchTerm) ||
                    person.workplace.toLowerCase().includes(searchTerm)
                );
                displayCopywriters(filteredData);
            });
        })
        .catch(error => console.error('Error loading the data:', error));

    // تابع برای نمایش داده‌ها در جدول
    function displayCopywriters(data) {
        copywritersList.innerHTML = '';
        data.forEach(person => {
            const row = `
                <tr>
                    <td><img src="images/${person.image}" alt="${person.name}" class="img-thumbnail" width="100"></td>
                    <td>${person.name}</td>
                    <td>${person.workplace}</td>
                    <td>
                        ${person.socialMedia.map(social => `
                            <a href="${social.link}" target="_blank">
                                <i class="fab fa-${social.icon} social-icon"></i>
                            </a>
                        `).join(' ')} <!-- فقط فاصله به عنوان جداکننده -->
                    </td>
                </tr>
            `;
            copywritersList.innerHTML += row;
        });
    }
});
