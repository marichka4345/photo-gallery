var setSortingData;
$(function() {
    $('.user-login').append(localStorage.userToken);
    setTopBlockHeight();
    logOut();
    gotoMyPhotos();
    gotoPopular();
    setSortingData = manageSorting();
    definePagination();
    manageSearch();
});

/*********************Check css3 columns***********************************/
function setupJSColumnsIfNeeded() {
    var div = $('<div style="-webkit-column-count: 3; -moz-column-count: 3; column-count: 3;" />');
    if(!div.css('column-count') && !div.css('-webkit-column-count') && !div.css('-moz-column-count')) {
        $('.content').columnize({ columns: 4, width: 300 });
    };
}

/**************Padding of first block after header*************************/
function setTopBlockHeight() {
    var headerHeight = parseFloat($('.main-header').outerHeight());
    $('.main-header').next().css({
        'paddingTop': headerHeight + 'px'
    });
}
/************************************************************************/

/************************Logout/popular/my**********************************/
function logOut() {
    $('.flaticon-logout').click(function() {
        api.logoutUser();
        location = "../html/index.html";
    });
}

function gotoMyPhotos() {
    $('.my-fotos').click(function(event) {
        event.preventDefault();
        $('.active-choice').removeClass('active-choice');
        $('.arrow-active').removeClass('arrow-active');
        var user = localStorage.userToken,
            photos = api.getUserPhotos(user),
            formatedArr = [];
        photos.forEach(function(p) {
            formatedArr.push([user, p]);
        });
        definePagination(formatedArr);
    });
}

function gotoPopular() {
    $('.popular').click(function(event) {
        event.preventDefault();
        var direction = 'desc',
            criteria = 'likes';
        $('.active-choice').removeClass('active-choice');
        $('.arrow-active').removeClass('arrow-active');
        $('.desc-triangle').addClass('arrow-active');
        $('.likes-type').addClass('active-choice');

        var sortedPhotos = api.sortData(criteria, direction);
        var firstPhotos = sortedPhotos.slice(0, 8);
        definePagination(firstPhotos);

    });
}
/************************************************************************/

/**************Like photo*************************/
function changeLikesCount() {
    $('div.photo-likes>*').click(likeHandler);

    function likeHandler(event) {
        event.stopPropagation();
        var photoSrc = $(this).parent().parent().siblings('.img-container').find('img').attr('src');
        var author = $(this).parent().parent().prev().find('span').text();
        var clickHandler = (function(likes) {
            $(this).parent('.photo-likes').find('span').html(likes);
        }).bind($(this));

        api.likePhoto(localStorage.userToken, author, photoSrc, clickHandler);
    }
}
/*********************************************/

/**************Sorting*************************/
function manageSorting(found, templateName) {
    var direction = 'desc',
        criteria;
    $('.sort-type').click(function() {
        $('.active-choice').removeClass('active-choice');
        $(this).addClass('active-choice');
        if ($(this).hasClass('date-type')) {
            criteria = 'date';
        } else if ($(this).hasClass('likes-type')) {
            criteria = 'likes';
        }
        callSorting();
    });

    $('.triangles div').click(function() {
        if ($('.active-choice').length) {
            $('.arrow-active').removeClass('arrow-active');
            $(this).addClass('arrow-active');
            callSorting();
        }
    });

    function callSorting() {
        var activeArrow = $('.arrow-active');
        direction = 'desc';
        if (!activeArrow.length) {
            $('.desc-triangle').addClass('arrow-active');
        }
        if (activeArrow.hasClass('asc-triangle')) direction = 'asc';
        var sortedPhotos = api.sortData(criteria, direction, found);
        definePagination(sortedPhotos, templateName);
    }

    return function(dataToSort, template) {
        found = dataToSort;
        templateName = template;
    };
}
/*********************************************/

/**************Filtering*************************/
function requestFilter() {
    $('.tag-container span').click(function() {
        $('.active-choice').removeClass('active-choice');
        $('.arrow-active').removeClass('arrow-active');
        var tag = $(this).text().slice(1);
        $('.modal').removeClass('visible');
        var found = api.filterByTag(tag, definePagination, console.log);
        setSortingData(found);
    });
}
/*********************************************/

/**************Pagination*************************/
function showFullSizeImg(infoArr) {
    $('.content').on('click', '.photo-container', function(e) {
        var target = $(e.target),
            photoSrc = target.attr('src') || target.children('img').attr('src');

        $('.modal').addClass('visible');
        $('.modal-content').attr('src', photoSrc);
        $('.photo-info').css('margin-top', parseFloat($('.photo-info').innerHeight()) / -2 + 'px');

        var infoObj = infoArr.filter(function(photo) { return photo.src === photoSrc; });
        if (infoObj.length != 0) {
            infoObj = infoObj[0];
            $('.photo-info .author').text(infoObj.author);
            $('.like-photo span').text(target.closest('.image').find('.likes').text() || infoObj.likes);
            $('.photo-info p.heading').text(infoObj.title);
            $('.photo-info p.description').text(infoObj.description);
            $('.photo-info .tags').empty();
            infoObj.tags.forEach(function(tag) {
                $('.photo-info .tags').append('<div class="tag-container"><span>#' + tag + '</span></div>');
            });
            requestFilter();
        }
    });

    $('.close img').click(function() {
        $('.modal').removeClass('visible');
    });
}

function showImages(imgs, templateName) {
    var data = { photos: [] },
        isSearch = templateName === 'found-photos';
    templateName = templateName || 'user-photos';
    imgs.forEach(function(p) {
        var date = new Date(p[1].createdDate),
            dateStr = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
            author = p[0],
            photoSrc = p[1].photo,
            likes = p[1].likes.length,
            description = p[1].description,
            title = p[1].title,
            tags = p[1].tags;

        data.photos.push({ src: photoSrc, author: author, likes: likes, dateStr: dateStr, tags: tags, title: title, description: description });
    });
    var tmpl = document.getElementById(templateName).innerHTML.trim();
    tmpl = _.template(tmpl);
    $('.content').append(tmpl(data));
    setupJSColumnsIfNeeded();

    var messageWrapper = $('.message-wrapper'),
        sortWrapper = $('.sort-wrapper');
    if (data.photos.length === 0) {
        sortWrapper.removeClass('visible');

        tmpl = document.getElementById('not-found').innerHTML.trim();
        tmpl = _.template(tmpl);
        messageWrapper.empty();
        messageWrapper.append(tmpl({ isSearch: isSearch }));
    } else {
        sortWrapper.addClass('visible');
        messageWrapper.empty();
        showFullSizeImg(data.photos);
        changeLikesCount();
    }
}

function definePagination(sortedData, templateName) {
    var photoCount = 4;
    var pagesContainer = $('.pages-container');
    var pagesCount = Math.ceil((sortedData || api.getAllPhotos(localStorage.userToken)).length / photoCount);
    $('.content').empty();
    pagesContainer.empty();


    if (pagesCount === 1) {
        pagesContainer.append('<li class="page-item"><a href="#" class="page-link">1</a></li>');
    } else if (pagesCount > 1) {
        pagesContainer.append('<li class="page-item"><a class="nav-link prev-link" href="#">&lt;</a></li>');
        var displayedPages = (pagesCount < 3) ? pagesCount : 3;
        for (var i = 1; i <= displayedPages; i++) {
            pagesContainer.append('<li class="page-item page-number"><a href="#" class="page-link">' + i + '</a></li>');
        }

        pagesContainer.append('<li class="page-item"><a class="nav-link next-link" href="#">&gt;</a></li>');
    }

    $('.page-item .page-link:contains(1)').addClass('active');
    stylePagination();
    if(sortedData === undefined) {
        api.getNextPage(1, photoCount, function(images) { showImages(images, templateName); });
    } else {
        showImages(sortedData.slice(0, photoCount), templateName);
    }
    movePagination(photoCount, pagesCount, pagesContainer, sortedData, templateName);
    setSortingData(sortedData, templateName);
}

function stylePagination() {
    $('.page-item a').on('mouseover', function() {
        $('.hovered').removeClass('hovered');
        $(this).addClass('hovered');
    });

    $('.page-item a').on('mouseout', function() {
        $('.hovered').removeClass('hovered');
    });
    $('.page-item a').not('.nav-link').click(function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
    });
}

function movePagination(photoCount, pagesCount, pagesContainer, sortedData, templateName) {
    linkClickHandler();
    navClickHandler();

    function navClickHandler() {
        $('.nav-link').click(function() {
            var activePage = parseInt($('.active').html());
            if ($(this).hasClass('next-link')) {
                if (activePage !== pagesCount) {
                    if (activePage % 3 === 0) {
                        var pagesLeft = pagesCount - activePage;
                        $('.page-item').remove();
                        if (pagesLeft === 1) {
                            pagesContainer.append('<li class="page-item page-number"><a href="#" class="page-link">' + (activePage + 1) + '</a></li>');
                        } else {
                            var displayedPages = (pagesLeft < 3) ? pagesLeft : 3;
                            pagesContainer.append('<li class="page-item"><a class="nav-link prev-link" href="#">&lt;</a></li>');
                            for (var i = 1; i <= displayedPages; i++) {
                                pagesContainer.append('<li class="page-item page-number"><a href="#" class="page-link">' + (i + activePage) + '</a></li>');
                            }
                            pagesContainer.append('<li class="page-item"><a class="nav-link next-link" href="#">&gt;</a></li>');
                        }
                        stylePagination();
                        linkClickHandler();
                        navClickHandler();

                    }
                    console.log(activePage);
                    showContent(activePage + 1);
                }
            } else if (activePage > 1) {
                if (activePage % 3 === 1) {
                    $('.page-item').remove();
                    pagesContainer.append('<li class="page-item"><a class="nav-link prev-link" href="#">&lt;</a></li>');
                    for (var i = 3; i > 0; i--) {
                        pagesContainer.append('<li class="page-item page-number"><a href="#" class="page-link">' + (activePage - i) + '</a></li>');
                    }
                    pagesContainer.append('<li class="page-item"><a class="nav-link next-link" href="#">&gt;</a></li>');
                    stylePagination();
                    linkClickHandler();
                    navClickHandler();
                }
                console.log(activePage);
                showContent(activePage - 1);
            }
        });
    }

    function showContent(pageNumber) {
        $('.content').empty();
        if (pageNumber) {
            $('.page-link').removeClass('active');
            $('.page-item a:contains("' + pageNumber + '")').addClass('active');
        }
        if(sortedData === undefined) {
            api.getNextPage(pageNumber, photoCount, function(photos) { showImages(photos, templateName); });
        } else {
            var offset = (pageNumber - 1) * photoCount;
            showImages(sortedData.slice(offset, offset + photoCount), templateName);
        }
    }

    function linkClickHandler() {
        $('.page-link').click(function() {
            showContent($(this).html());
        });
    }

}
/****************************************************/

/**************Search photo*************************/
function manageSearch() {
    $('.search').val('');

    function onHover() {
        $('.search-icon').addClass('active-icon');
        $('.search').addClass('active-search').on('keyup', removeHover);
    }

    function removeHover() {
        if (!($('.search').val().length || $('.site-search').is(':hover'))) {
            $('.search-icon').removeClass('active-icon');
            $('.search').removeClass('active-search');
            $('.search-error').remove();
        }
    }
    $('.site-search').hover(onHover, removeHover);

    $('#search-form').submit(validateForm);


    function validateForm(event) {
        var val = $('.search').val();
        var templateName = "found-photos";
        var errorMsg = $('<div class="search-error"></div>'),
            searchBlock = $('.site-search').eq(0);

        $('.search-error').remove();

        function formErrorMsg(str) {
            errorMsg.append(str);
            searchBlock.append(errorMsg);
            event.preventDefault();
            return false;
        }
        var valValid = (function validateValue() {
            return (val.length > 1);
        })();

        if (!valValid) {
            formErrorMsg('<p>Введіть вірний пошуковий критерій!</p>');
            return false;
        }

        api.search(val, function(photos) {
            var required = [];
            photos.forEach(function(p) {
                required.push(p.photo);
            });
            definePagination(required, 'found-photos');
        }, console.log);
        event.preventDefault();
        return true;
    }
}
/*************************************************/