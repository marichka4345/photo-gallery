$(document).ready(function() {
    $('#rg-form').submit(
        validateForm
    );

    function validateForm(event) {
        var email = $('#rg-email').val(),
            login = $('#rg-login').val(),
            pass = $('#rg-passwd').val(),
            conf = $('#rg-confirm').val();
        var errorMsg = $('<div class="error"></div>'),
            firstInput = $('.rg-input').eq(0);

        $('.error').remove();

        function formErrorMsg(str) {
            errorMsg.append(str);
            firstInput.before(errorMsg);
            event.preventDefault();
            return false;
        }
        var emailValid = email.match(/^\w+[\.+]?\w+@\w+\.[a-z]{2,}$/i);

        var loginValid = login.match(/^[a-z]+.+$/i);

        var passwordValid = pass.match(/^.{6,}$/);

        if (!loginValid) {
            formErrorMsg('<p>Логін повинен містити мінімум 2 символи і починатися літерою!</p>');
            return false;
        }
        if (!passwordValid) {
            formErrorMsg('<p>Пароль повинен містити мінімум 6 символів!</p>');
            return false;
        }
        if (pass !== conf) {
            formErrorMsg('<p>Пароль і підтвердження не співпадають!</p>');
            return false;
        }
        api.registerUser({
            login: login,
            password: pass
        }, alert, formErrorMsg);
        return true;
    }
});