var file, Flash = {
    getFileData: function(base64) {
        file = base64;
    },
    getButtonLabel: function() {
        return "Оберіть фото в форматі .jpg";
    }
};

$(function() {
    $('#upld-tags').on('keydown', function(e) {
        var value = $(this).val();
        if (e.keyCode === 13 && value) {
            $('.tags').append('<div class="tag-container"><span>' + value + '</span><div class="cross"></div></div>');
            handleContainerClose();
            $(this).val('');
        }
    });

    function handleContainerClose() {
        $('.tag-container .cross').click(function() {
            $(this).parent().remove();
        });
    }
    $('#upld-form').on('keydown', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });
    $('#upld-form').submit(validateForm);

    function validateForm(event) {
        if (file) {
            file = "data:image/jpeg;base64," + file;
        } else {
            file = $('.file-input')[0].files[0];
        }
        var title = $('#upld-title').val(),
            description = $('#upld-description').val(),
            tagsElems = $('.tag-container span'),
            tags = [];
        tagsElems.each(function() {
            tags.push($(this).text());
        });
        var errorMsg = $('<div class="error"></div>'),
            formHeading = $('.rg-heading').eq(0);

        $('.error').remove();

        function formErrorMsg(str) {
            errorMsg.append(str);
            formHeading.after(errorMsg);
            event.preventDefault();
            return false;
        }

        if (!file) {
            formErrorMsg("Не завантажено файл!");
            return false;
        }
        if (!title.trim().length) {
            formErrorMsg("Назва не повинна бути пуста");
            return false;
        }
        if (!description.trim().length) {
            formErrorMsg("Опис не повинен бути пустий");
            return false;
        }
        api.loadPhoto(localStorage.userToken, file, {
                "description": description,
                "title": title,
                "tags": tags
            },

            function(msg) {
                console.log(msg);
                location = "./user.html";
            },
            function(msg) {
                console.log(msg);
            });
        event.preventDefault();
    }

    var inputs = $('.file-input');
    if (typeof FileReader === "function") {
        inputs.each(function() {
            var label = $(this).next(),
                labelVal = label.text();

            $(this).on('change', function(e) {
                var fileName = '';
                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else {
                    fileName = e.target.value.split('\\').pop();
                }

                if (fileName)
                    label.find('span').text(fileName);
                else
                    label.tetx(labelVal);
            });
        });
    } else {
        inputs.replaceWith('<object id="file-object"></object>');
        $('.flaticon-cloud-computing').remove();
        swfobject.embedSWF("../js/fileLoadOld/FileToDataURI.swf", "file-object", "183", "21", "10", "../js/fileLoadOld/dist/swfobject/expressInstall.swf", {}, {}, { "class": "ie8-button" });
    }
});