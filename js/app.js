$(function () {
    const formTabBtns = $('.form-tab-btn');

    formTabBtns.on('click', function () {
        const buttonName = $(this).data('buttonName'),
              formInput = $(this).closest('.form').find('.form__bottom').find('.input');

        formTabBtns.removeClass('active');
        $(this).addClass('active');
        formInput.attr('name', buttonName);
    });

    const catalogTabBtns = $('.catalog-tab');
    const catalogLists = $('.catalog-tabs__content ul');

    catalogTabBtns.on('click', function () {
        const tabID = $(this).data('action'),
              catalogList = $(this).closest('.catalog-tabs').find('.catalog-tabs__content').find(`[data-id="${tabID}"]`);

        if (!tabID.length || !catalogList.length) return;

        catalogTabBtns.each((index, item) => $(item).removeClass('catalog-tab--active'));
        catalogLists.each((index, item) => $(item).removeClass('catalog-list--active'));
        $(this).addClass('catalog-tab--active');
        catalogList.addClass('catalog-list--active');
    });

    $('.hamburger__icon').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('open');

        $('.modal-view').toggleClass('modal-view--open');
    });

    function disableScrollInActiveModal() {
        let body = document.body,
            windowScrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.top = `-${windowScrollY}px`;
    }

    function enableScrollInActiveModal() {
        let body = document.body,
            scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    let isValidMask = false;

    $('.phone-mask').mask('+7 (000) 000-00-00', {
        onComplete: function (cep) {
            isValidMask = true;
        },
        onInvalid: function (cep) {
            isValidMask = false;
        },

    });

    // Отправка заявки
    $('.js-zayavka').submit(function (e) {
        e.preventDefault();

        if (isValidMask) {
            ym(70783414,'reachGoal','mama_lead')
            VK.Goal('lead')
            fbq('track', 'Lead')

            $.post('/mail.php', $(this).serialize(), function (response) {
                if (response && response.status === false) {
                    alert(response.error);
                } else if (response && response.status === true) {
                    //alert(response.msg)
                    location.href = '/thanks'
                } else {
                    alert('Ошибка отправки. Пожалуйста свяжитесь с администратором!')
                }
            })
        }
    });
});
