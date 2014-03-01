(function (global) {
    Parse.initialize('7NiaLTPJTZAUHtDj6xfJSPPiqe1GxCnkKTs8z5uT', '4URmkfeqSGc8ftF5jII6X7CHziOCm3BMrjmLdbQK');

    $(document).off('pageshow', '#pageLogin');
    $(document).on('pageshow', '#pageLogin', function () {
        var lang = localStorage.getItem('lang');

        if(lang !== null){
            var opts = {
                forceLang: lang,
                path: "scripts/lang",
                cache: false
            };
            
            $("[data-translate]").jqTranslate('index', opts);
            $('#navbar_lang a').removeClass('ui-btn-active');
            $('#lang_' + lang).addClass('ui-btn-active');
        }

        //        var currentUser = Parse.User.current();
        //        if (currentUser) {
        //            $.mobile.changePage('views/userpage.html');
        //        }

        $('#lang_br').on('click', function () {
            var opts = {
                forceLang: 'br',
                path: "scripts/lang",
                cache: false
            };
            $("[data-translate]").jqTranslate('index', opts);
            localStorage.setItem('lang', 'br');
        });

        $('#lang_en').on('click', function () {
            var opts = {
                forceLang: 'en',
                path: "scripts/lang",
                cache: false
            };
            $("[data-translate]").jqTranslate('index', opts);
            localStorage.setItem('lang', 'en');
        });

        $('#btn_login').on('click', function () {
            $.mobile.loading('show');
            var username = $('#obj_login_username').val();
            var password = $('#obj_login_password').val();

            Parse.User.logIn(username, password, {
                success: function (user) {
                    $.mobile.changePage('views/userpage.html', {
                        transition: 'flow'
                    });
                },
                error: function (user, error) {
                    $('#popupUserNotFound').popup('open');
                    $.mobile.loading('hide');
                }
            });
        });
    });

    $(document).off('pageshow', '#pageSignup');
    $(document).on('pageshow', '#pageSignup', function () {
        $('#btn_save_user').on('click', signup);

        //<editor-fold defaultstate="collapsed" desc="Configure form validate signup">
        $('#formSignup').validate({
            rules: {
                firstname: 'required',
                lastname: 'required',
                username: 'required',
                password: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                firstname: 'Por favor, informe o seu nome.',
                lastname: 'Por favor, informe o seu sobrenome.',
                username: 'Informe um usuário para o seu login',
                password: 'A senha é uma informação que ajuda na sua segurança.',
                email: {
                    required: "Seu email é uma informação que consideramos importante.",
                    email: "Seu email deve ter o seguinte formato, nome@dominio.com"
                }
            }
        });
        //</editor-fold>
    });

    function signup() {
        if ($('#formSignup').valid()) {
            $.mobile.loading('show');

            var user = new Parse.User();

            user.set('username', $('#obj_signup_username').val());
            user.set('password', $('#obj_signup_password').val());
            user.set('email', $('#obj_signup_email').val());

            user.set('firstname', $('#obj_signup_firstname').val());
            user.set('lastname', $('#obj_signup_lastname').val());

            user.signUp(null, {
                success: function (user) {
                    $.mobile.changePage('views/userpage.html');
                },
                error: function (user, error) {
                    $.mobile.loading('hide');
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    };
})(window);