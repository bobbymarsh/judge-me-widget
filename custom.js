document.addEventListener('DOMContentLoaded', function() {
    // Mutation Observer untuk memantau jika elemen-elemen dari widget Judge.me muncul
    const observer = new MutationObserver((mutations, observerInstance) => {
        const cards = document.querySelectorAll('.jdgm-carousel-item'); // NodeList
        const container_title_link = document.querySelector('.jdgm-carousel-title-and-link');
        const data  = document.querySelector('.jdgm-rev-widg__summary-inner');
        
        // Memastikan elemen-elemen utama widget sudah ada
        if (cards.length > 0 && container_title_link && data) {
            // DOM Manipulation setelah elemen ditemukan
            container_title_link.appendChild(data);
            container_title_link.style.backgroundColor = 'blue';

            const ratingWrapper = container_title_link.querySelector('.jdgm-all-reviews-rating-wrapper');
            if (ratingWrapper) ratingWrapper.remove();

            const linkElement = container_title_link.parentElement.querySelector('div > a');
            if (linkElement) linkElement.remove();

            const container_medal = document.querySelector('.jdgm-medals__container');
            const wrapper_medals = document.querySelectorAll('.jdgm-medal-wrapper');

            if (container_medal && wrapper_medals.length > 0) {
                container_title_link.appendChild(container_medal);
                
                wrapper_medals.forEach((wrap) => {
                    wrap.style.display = 'none';
                });

                // Menampilkan hanya 2 medal yang pertama
                for (let i = 0; i < 2; i++) {
                    if (wrapper_medals[i]) wrapper_medals[i].style.display = "block";
                }
            }

            // Manipulasi setiap card
            cards.forEach((card) => {
                const container_review = card.querySelector('.jdgm-carousel-item__review');
                const name = card.querySelector('.jdgm-carousel-item__reviewer-name-wrapper');

                if (container_review && name) {
                    container_review.prepend(name);
                }

                const link = card.querySelector('.jdgm-carousel-item__product');
                if (link) link.remove();

                const container = container_review ? container_review.parentElement : null;
                const content = card.querySelector('.jdgm-carousel-item__review-content');

                if (container && content) {
                    container.appendChild(content);
                }

                const container_section = document.querySelector('.testimonials');
                if (container_section && container_section.firstElementChild) {
                    container_section.firstElementChild.style.display = "none";
                }

                // Buat elemen baru untuk star dan date
                const container_star_date = document.createElement('div');
                container_star_date.classList.add('container_star_date');

                if (container_review) {
                    container_review.appendChild(container_star_date);

                    const date = card.querySelector('.jdgm-carousel-item__timestamp');
                    const star = card.querySelector('.jdgm-carousel-item__review-rating');

                    if (date && star) {
                        container_star_date.appendChild(star);
                        container_star_date.appendChild(date);
                    }
                }

                if (container) {
                    container.parentElement.classList.add('container_card');
                }

                if (container_review) {
                    container_review.classList.add('container_one');
                    container_review.parentElement.classList.add('card');
                }
            });

            // Setelah elemen ditemukan dan dimanipulasi, hentikan observer
            observerInstance.disconnect();
        }
    });

    // Mulai mengamati perubahan di seluruh body
    observer.observe(document.body, { childList: true, subtree: true });
});
