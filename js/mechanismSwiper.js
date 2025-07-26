// Данные для всех слайдов
const slidesData = [
    {
        title: "Регистрация и добавление проекта в систему",
        emoji: "img/mechanism/man-technologist.png",
        alt: "Иконка технолога",
        number: "01",
        content: {
            type: "list",
            items: [
                "Зарегистрируйтесь в нашем личном кабинете",
                "При добавлении проекта вам необходимо указать URL (адрес) своего сайта",
                "Для вашего сайта будет сгенерирован уникальный код, который необходимо установить на свой сайт (в шаблоне сайта, перед тегом &lt;/head&gt;)"
            ]
        }
    },
    {
        title: "Выбор пакета и количества Лидов",
        emoji: "img/mechanism/check-mark.png",
        alt: "Иконка галочки",
        number: "02",
        content: {
            type: "text",
            text: "После добавления проекта в систему, вам необходимо выбрать тот пакет и количество Лидов, которое вам необходимо."
        }
    },
    {
        title: "Оплата проекта",
        emoji: "img/mechanism/money-with-wings.png",
        alt: "Иконка денег с крыльями",
        number: "03",
        content: {
            type: "text",
            text: "Оплатить Лидов вы сможете пластиковой картой или безналичным переводом."
        }
    },
    {
        title: "Получение кода для сайта",
        emoji: "img/mechanism/locked.png",
        alt: "Иконка замка",
        number: "04",
        content: {
            type: "text",
            text: "После оплаты, система для вас сгенерирует код, который вам необходимо установить на свой сайт (в шаблоне сайта, перед тегом &lt;/head&gt;)."
        }
    },
    {
        title: "Начало получения Лидов",
        emoji: "img/mechanism/star-struck.png",
        alt: "Иконка звезды",
        number: "05",
        content: {
            type: "text",
            text: "В зависимости от вашей тематики (услуги или товара), а также объёма вашего трафика сайта система будет добавлять в личном кабинете контакты потенциальных клиентов, заинтересованных в вашей услуги и из вашего региона."
        }
    }
];

// Функция для создания HTML контента слайда
function createSlideContent(contentData) {
    if (contentData.type === "list") {
        return `
            <ol class="mechanism-slide__list" role="list">
                ${contentData.items.map((item, index) =>
            `<li role="listitem" aria-posinset="${index + 1}" aria-setsize="${contentData.items.length}">
                        ${item}
                    </li>`
        ).join('')}
            </ol>
        `;
    } else {
        return `<p class="mechanism-slide__text">${contentData.text}</p>`;
    }
}

// Функция для создания HTML одного слайда
function createSlideHTML(slideData, index) {
    return `
        <div class="swiper-slide mechanism-slide" role="listitem" aria-label="Шаг ${slideData.number}" tabindex="0">
            <div class="section-title text-center">
                <h2 id="mechanism-section-title">Как это работает?</h2>
            </div>
            
            <div class="mechanism-slide__inner">
                <div class="mechanism-slide__title">
                    <div class="mechanism-slide__title--number">
                        <p>${slideData.number}</p>
                        <img src="${slideData.emoji}" alt="${slideData.alt}" aria-hidden="true">
                    </div>
                    <h3>${slideData.title}</h3>
                </div>
                
                ${createSlideContent(slideData.content)}
            </div>
        </div>
    `;
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.querySelector('.mechanism-wrapper');

    if (!swiperWrapper) {
        console.error('Swiper wrapper element not found!');
        return;
    }

    // Создаем и добавляем слайды
    slidesData.forEach((slide, index) => {
        swiperWrapper.insertAdjacentHTML('beforeend', createSlideHTML(slide, index));
    });

    // Инициализируем Swiper
    const swiper = new Swiper('.mechanism-swiper', {
        loop: false,
        pagination: {
            clickable: true,
            el: '.mechanism-pagination',
        },
        a11y: {
            prevSlideMessage: 'Предыдущий шаг',
            nextSlideMessage: 'Следующий шаг',
            paginationBulletMessage: 'Перейти к шагу {{index}}',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        speed: 400,
    });

    // Обновляем доступность после инициализации
    swiper.on('init', function () {
        updateAriaLive(swiper);
    });

    swiper.on('slideChange', function () {
        updateAriaLive(swiper);
    });

    function updateAriaLive(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        activeSlide.setAttribute('aria-live', 'polite');
        swiper.slides.forEach((slide, i) => {
            if (i !== swiper.activeIndex) {
                slide.removeAttribute('aria-live');
            }
        });
    }

    swiper.init();
});