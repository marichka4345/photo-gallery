$(document).ready(function() {
    $('#rg-form').submit(
        validateForm
    );

    function validateForm(event) {
        var login = $('#rg-login').val(),
            pass = $('#rg-passwd').val();
        var errorMsg = $('<div class="error"></div>'),
            firstInput = $('.rg-input').eq(0);

        $('.error').remove();

        function formErrorMsg(str) {
            errorMsg.append(str);
            firstInput.before(errorMsg);
            event.preventDefault();
            return false;
        }

        api.loginUser({
            login: login,
            password: pass
        }, alert, formErrorMsg);
        return true;

    }
});