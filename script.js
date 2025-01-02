// ابتدا Supabase را مقداردهی کنید
const supabaseUrl = 'https://zrvxlrizafueghymyenu.supabase.co'; // URL پروژه Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpydnhscml6YWZ1ZWdoeW15ZW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NDU0NjQsImV4cCI6MjA1MTQyMTQ2NH0.2mt_G-AOza00weHpyV3Vmwvx8NgA1PulGwfRIhA2t_0'; // کلید عمومی Supabase
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const copywritersList = document.getElementById('copywriters-list');
    const addCopywriterForm = document.getElementById('addCopywriterForm');

    // بارگذاری داده‌ها از Supabase
    loadCopywriters();

    // افزودن قابلیت جستجو
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        filterCopywriters(searchTerm);
    });

    // مدیریت فرم افزودن کپی‌رایتر جدید
    addCopywriterForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const newCopywriter = {
            name: document.getElementById('name').value,
            workplace: document.getElementById('workplace').value,
            image: document.getElementById('image').value,
            social_media: JSON.parse(document.getElementById('socialMedia').value)
        };

        // افزودن داده‌ها به Supabase
        const { data, error } = await supabase
            .from('copywriters')
            .insert([newCopywriter]);

        if (error) {
            console.error('Error adding copywriter:', error);
        } else {
            loadCopywriters(); // بارگذاری مجدد داده‌ها
            addCopywriterForm.reset(); // پاک کردن فرم
        }
    });

    // تابع برای بارگذاری داده‌ها از Supabase
    async function loadCopywriters() {
        const { data, error } = await supabase
            .from('copywriters')
            .select('*');

        if (error) {
            console.error('Error loading copywriters:', error);
        } else {
            displayCopywriters(data);
        }
    }

    // تابع برای فیلتر کردن داده‌ها
    async function filterCopywriters(searchTerm) {
        const { data, error } = await supabase
            .from('copywriters')
            .select('*')
            .or(`name.ilike.%${searchTerm}%,workplace.ilike.%${searchTerm}%`);

        if (error) {
            console.error('Error filtering copywriters:', error);
        } else {
            displayCopywriters(data);
        }
    }

    // تابع برای نمایش داده‌ها در جدول
    function displayCopywriters(data) {
        copywritersList.innerHTML = '';
        data.forEach(person => {
            const row = `
                <tr>
                    <td><img src="${person.image}" alt="${person.name}" class="img-thumbnail" width="100"></td>
                    <td>${person.name}</td>
                    <td>${person.workplace}</td>
                    <td>
                        ${person.social_media.map(social => `
                            <a href="${social.link}" target="_blank">
                                <i class="fab fa-${social.icon} social-icon"></i>
                            </a>
                        `).join(' ')}
                    </td>
                </tr>
            `;
            copywritersList.innerHTML += row;
        });
    }
});
