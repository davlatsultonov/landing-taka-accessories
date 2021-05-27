$(function () {
    $('.hamburger__icon').on('click', function () {
        $(this).toggleClass('open');
        $(this).closest('.header').toggleClass('open');
    });


    const formTabBtns = $('.form-tab-btn');

    $('.form-tab-btn').on('click', function () {
        const buttonName = $(this).data('buttonName'),
              formInput = $(this).closest('.form').find('.form__bottom').find('.input');

        formTabBtns.removeClass('active');
        $(this).addClass('active');
        formInput.attr('name', buttonName);
    });

    $('.js-feedback-toggle').click(function (e) {
        e.preventDefault();

        if (!$('.modal-view, .wrapper').hasClass('modal-view--open')) {
            $('.modal-view').addClass('modal-view--open');
            $('.wrapper').addClass('modal-view--open');
            disableScrollInActiveModal();
        } else {
            $('.modal-view').removeClass('modal-view--open');
            $('.wrapper').removeClass('modal-view--open');
            enableScrollInActiveModal();
        }

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
