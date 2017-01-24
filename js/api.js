var api = (function() {
    var actualUsers = [];

    /**************LocalStorage load/save*******************/
    if (window.addEventListener)
        window.addEventListener('load', loadStorage);
    else if (window.attachEvent)
        window.attachEvent('onload', loadStorage);
    loadStorage();

    function loadStorage() {
        if (!localStorage.users) {
            var users = [{
                    login: 'maria1',
                    password: '123456',
                    photos: [{
                            photo: '../img/users/s1.jpg',
                            createdDate: new Date(2016, 7, 20),
                            likes: ['maria2', 'maria3'],
                            title: 'Вулички Туреччини',
                            description: 'Туреччина надихає. Фото зроблено на одній чарівній вулиці.',
                            tags: ['journey', 'travel', 'tourkey', '2016']
                        },
                        {
                            photo: '../img/users/s2.jpg',
                            createdDate: new Date(2016, 3, 10),
                            likes: ['maria2'],
                            title: 'Природа і думки',
                            description: 'Природа часто надихає нас на несподвані роздуми. Фото зроблено там, де душа відпочиває.',
                            tags: ['girl', 'thoughts', 'myfriend', '2016', 'nature']
                        },
                        {
                            photo: '../img/users/s3.jpg',
                            createdDate: new Date(2011, 8, 10),
                            likes: ['maria2, maria3'],
                            title: 'Природа і думки',
                            description: 'Природа часто надихає нас на несподвані роздуми. Фото зроблено там, де душа відпочиває.',
                            tags: ['girl', 'thoughts', 'myfriend', '2011', 'nature']
                        },
                        {
                            photo: '../img/users/s4.jpg',
                            createdDate: new Date(2010, 3, 12),
                            likes: [],
                            title: 'Сова готується',
                            description: 'Природа-наскільки прекрасна вона. Особливо з близької відстані.',
                            tags: ['nature', 'owl']
                        }
                    ]
                },
                {
                    login: 'maria2',
                    password: '111111',
                    photos: [{
                            photo: '../img/users/s5.jpg',
                            createdDate: new Date(2016, 3, 10),
                            likes: ['maria1', 'maria2', 'maria3'],
                            title: 'Дівчина з дзеркалом',
                            description: 'Фотографія незвичайна, фотографія креативна і змушує задуматися.',
                            tags: ['girl', 'thoughts', 'myfriend', '2016', 'mirror']
                        },
                        {
                            photo: '../img/users/s6.png',
                            createdDate: new Date(2011, 3, 10),
                            likes: ['maria2'],
                            title: 'Пташка і метелик',
                            description: 'Природа-наскільки прекрасна вона. Особливо з близької відстані.',
                            tags: ['bird', '2011', 'nature']
                        },
                        {
                            photo: '../img/users/s7.jpg',
                            createdDate: new Date(2016, 8, 10),
                            likes: [],
                            title: 'Захід сонця',
                            description: 'Краса особлико помітна при заході сонця. Фото з прекрасного села України.',
                            tags: ['flower', 'sun', 'nature']
                        },
                        {
                            photo: '../img/users/s8.jpg',
                            createdDate: new Date(2010, 3, 10),
                            likes: ['maria1', 'maria2', 'maria3'],
                            title: 'Дівчинка з котом',
                            description: 'Діти найкращі моделі для фотографії. ЇХні емоції завжди щирі та яскраві.',
                            tags: ['girl', '2010', 'happieness']
                        },
                        {
                            photo: '../img/users/s9.jpg',
                            createdDate: new Date(2015, 3, 10),
                            likes: [],
                            title: 'Квітка і човен',
                            description: 'Природа-наскільки прекрасна вона. Особливо з близької відстані.',
                            tags: ['flower', 'nature']
                        }
                    ]
                },
                {
                    login: 'maria3',
                    password: '123456',
                    photos: [{
                            photo: '../img/users/s10.jpg',
                            createdDate: new Date(2016, 3, 10),
                            likes: ['maria2', 'maria3'],
                            title: 'Дим',
                            description: 'Чорно-біла фотографія-портрет',
                            tags: ['man', 'smoke']
                        },
                        {
                            photo: '../img/users/s11.jpg',
                            createdDate: new Date(2011, 2, 10),
                            likes: ['maria2'],
                            title: 'Сова',
                            description: 'Природа-наскільки прекрасна вона. Особливо з близької відстані.',
                            tags: ['owl', 'nature']
                        },
                        {
                            photo: '../img/users/s12.jpg',
                            createdDate: new Date(2011, 9, 9),
                            likes: ['maria2'],
                            title: 'Руда',
                            description: 'Руді мають свій шарм. Ви так не думаєте?',
                            tags: ['girl', 'eyes']
                        },
                        {
                            photo: '../img/users/s13.jpg',
                            createdDate: new Date(2014, 5, 10),
                            likes: ['maria2'],
                            title: 'Квітка і човен',
                            description: 'Природа-наскільки прекрасна вона. Особливо з близької відстані.',
                            tags: ['girl', 'roling']
                        },
                        {
                            photo: '../img/users/s14.jpg',
                            createdDate: new Date(2016, 3, 10),
                            likes: ['maria1'],
                            title: 'Квітка і човен',
                            description: 'Природа-наскільки прекрасна вона. Особливо з близької відстані.',
                            tags: ['girl', 'nature']
                        },
                        {
                            photo: '../img/users/s15.png',
                            createdDate: new Date(2016, 3, 10),
                            likes: ['maria2'],
                            title: 'Сонце',
                            description: 'Майбутнє нашої планети і наших дітей залежить від нас. Задумаємося.',
                            tags: ['girl', 'sun']
                        },
                        {
                            photo: '../img/users/s16.jpg',
                            createdDate: new Date(2015, 6, 12),
                            likes: ['maria1'],
                            title: 'Сонце',
                            description: 'Майбутнє нашої планети і наших дітей залежить від нас. Задумаємося.',
                            tags: ['girl', 'blackwhite']
                        },
                        {
                            photo: '../img/users/s17.png',
                            createdDate: new Date(2016, 8, 10),
                            likes: ['maria2', 'maria1'],
                            title: 'Сонце',
                            description: 'Майбутнє нашої планети і наших дітей залежить від нас. Задумаємося.',
                            tags: ['girl', 'blackwhite']
                        },
                        {
                            photo: '../img/users/s18.jpg',
                            createdDate: new Date(2014, 3, 10),
                            likes: [],
                            title: 'Майбутнє',
                            description: 'Майбутнє нашої планети і наших дітей залежить від нас. Задумаємося.',
                            tags: ['hunting', 'child', 'nature']
                        },
                        {
                            photo: '../img/users/s19.jpg',
                            createdDate: new Date(2017, 1, 12),
                            likes: [],
                            title: 'Очі',
                            description: 'Краса деяких людей зачаровує. І часто очі заворожують настільки, що віж них не можна відірватися.',
                            tags: ['eyes', 'child']
                        },
                        {
                            photo: '../img/users/s20.jpg',
                            createdDate: new Date(2017, 1, 1),
                            likes: ['maria2'],
                            title: 'Майбутнє',
                            description: 'Майбутнє нашої планети і наших дітей залежить від нас. Задумаємося.',
                            tags: ['factory', 'child']
                        },
                        {
                            photo: '../img/users/s21.jpg',
                            createdDate: new Date(2014, 3, 10),
                            likes: ['maria2', 'maria1'],
                            title: 'Квітка',
                            description: 'Природа-наскільки прекрасна вона. Особливо з близької відстані.',
                            tags: ['flower', 'nature']
                        }
                    ]
                }
            ];

            localStorage.users = JSON.stringify(users);
        }
        actualUsers = JSON.parse(localStorage.users);
    }

    if (window.addEventListener)
        window.addEventListener('unload', saveStorage);
    else if (window.attachEvent)
        window.attachEvent('onunload', saveStorage);

    function saveStorage(onFailure) {
        try {
            localStorage.users = JSON.stringify(actualUsers);
        } catch (e) {
            if (isQuotaExceeded(e)) {
                onFailure("Неможливо зберегти!");
            }
        }
    }

    function isQuotaExceeded(e) {
        var quotaExceeded = false;
        if (e.code) {
            switch (e.code) {
                case 22:
                    quotaExceeded = true;
                    break;
                case 1014:
                    //Firefox
                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if (e.number === -2147024882) {
            //IE8
            quotaExceeded = true;
        }
        return quotaExceeded;
    }
    /*************************************************/

    /**************Photos load/get*******************/
    function loadPhoto(userToken, photo, additional, onSuccess, onFailure) {
        if (typeof photo === 'string') {
            addPhoto(userToken, photo, additional);
            return onSuccess("Успішно завантажено!");
        }
        if (~photo.type.indexOf('image')) {
            var reader = new FileReader();
            reader.addEventListener('load', function() {
                var data = reader.result;
                addPhoto(userToken, data, additional);
                onSuccess("Успішно завантажено!");
            });
            reader.readAsDataURL(photo);

        } else {
            onFailure("Виберіть зображення!");
        }
    }

    function addPhoto(userToken, data, additional) {
        var userIndex = findIndexByLogin(userToken);
        actualUsers[userIndex].photos.push(generatePhotoObj(data, additional));
    }

    function generatePhotoObj(data, additional) {
        return {
            photo: data,
            createdDate: new Date(),
            likes: [],
            title: additional.title,
            description: additional.description,
            tags: additional.tags
        }
    }

    function findIndexByLogin(login) {
        for (var i = 0; i < actualUsers.length; i++) {
            if (actualUsers[i].login === login) return i;
        }
        return null;
    }

    function getUserPhotos(userToken) {
        var photos = [],
            userIndex = (findIndexByLogin(userToken));
        if (userIndex === null) userIndex = Number(userToken);
        actualUsers[userIndex].photos.forEach(function(photo) {
            photos.push(photo);
        });
        return photos;
    }

    function getAllPhotos(userToken) {
        var photos = [];
        var userPhotos = [];
        actualUsers.forEach(function(user, index) {
            if (user.login === userToken) return;
            userPhotos = getUserPhotos(index);
            userPhotos.forEach(function(photo) {
                photos.push([user.login, photo]);
            });
        });
        return photos;
    }
    /*************************************************/

    /**************Like/Search*******************/

    function likePhoto(userToken, ownerToken, photoSrc, onSuccess) {
        var userPhotos = actualUsers[findIndexByLogin(ownerToken)].photos,
            likes;
        for (var i = 0; i < userPhotos.length; i++) {
            if (userPhotos[i].photo === photoSrc) {
                likes = userPhotos[i].likes;
                break;
            }
        }
        if (!~likes.indexOf(userToken)) userPhotos[i].likes.push(userToken);
        else userPhotos[i].likes.splice(likes.indexOf(userToken), 1);
        onSuccess(userPhotos[i].likes.length);
    }

    function search(searchVal, onSuccess, onFailure) {
        var allPhotos = getAllPhotos();
        var regex = new RegExp(searchVal, 'gi');
        var found = [];
        allPhotos.forEach(function(photo) {
            var title = photo[1].title,
                description = photo[1].description;
            var titleIndices = [],
                descriptionIndices = []
            while (result = regex.exec(title)) {
                titleIndices.push(result.index);
            }
            while (result = regex.exec(description)) {
                descriptionIndices.push(result.index);
            }
            if (titleIndices.length || descriptionIndices.length) {
                found.push({ 'photo': photo, "indices": [titleIndices, descriptionIndices] });
            }
        });
        if (!found.length) onFailure("Немає елементів, що задовільняють критерій пошуку!");
        onSuccess(found);
        return found;
    }
    /*************************************************/

    /**************Users login/register*******************/
    function registerUser(userObj, onSuccess, onFailure) {
        if (findIndexByLogin(userObj.login) === null) {
            actualUsers.push({
                login: userObj.login,
                password: userObj.password,
                photos: []
            });
            localStorage.userToken = userObj.login;
            onSuccess("Користувач був створений");
        } else {
            onFailure("Користувач з таким іменем уже існує!");
        }
    }

    function loginUser(userObj, onSuccess, onFailure) {
        var userIndex = findIndexByLogin(userObj.login);
        if (userIndex === null || actualUsers[userIndex].password !== userObj.password) {
            onFailure("Невірний логін або пароль!");
        } else {
            localStorage.userToken = userObj.login;
            onSuccess("Ви успішно увійшли");
        }
    }

    function logoutUser() {
        localStorage.removeItem('userToken');
    }
    /*************************************************/

    /**************Pagination*******************/
    function getNextPage(pageNumber, photoCount, onSuccess) {
        var photos = getAllPhotos(localStorage.userToken);
        var offset = (pageNumber - 1) * photoCount;
        var required = photos.slice(offset, offset + photoCount);
        onSuccess(required);
        return required;
    }
    /*************************************************/

    /**************Sorting/filtering*******************/
    function sortData(sortCriteria, direction, found) {
        var allPhotos = found || getAllPhotos(localStorage.userToken);

        if (sortCriteria === 'likes') {
            allPhotos.sort(function(a, b) {
                return a[1].likes.length - b[1].likes.length;
            });
        } else if (sortCriteria === 'date') {

            allPhotos.sort(function(a, b) {
                return Date.fromISO(a[1].createdDate) - Date.fromISO(b[1].createdDate);
            });
        }
        if (direction === 'desc') allPhotos.reverse();
        return allPhotos;
    }

    function filterByTag(tag, onSuccess, onFailure) {
        var allPhotos = getAllPhotos();
        var found = [];
        allPhotos.forEach(function(photo) {
            var tags = photo[1].tags;
            for (var i = 0; i < tags.length; i++) {
                if (tags[i] === tag) found.push(photo);
            }
        });
        if (!found.length) onFailure("Немає елементів з даним тегом!");
        onSuccess(found);
        return found;
    }
    /****************************************************/
    return {
        getUserPhotos: getUserPhotos,
        getAllPhotos: getAllPhotos,
        loadPhoto: loadPhoto,
        likePhoto: likePhoto,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        getNextPage: getNextPage,
        sortData: sortData,
        filterByTag: filterByTag,
        search: search
    };
})();