let retriveTeachers = async () => {
    const url = "/allTeachers";
    await fetch(url)
        .then(res => res.json())
        .then(res => jsonData = res);

    const length = jsonData.length;

    if (length == 0) {
        document.getElementById("cardId").innerHTML = "<h3>No Data yet..............</h3>";
    }
    else {
        var cardHTML = "", i = 0;
        jsonData.forEach((item) => {
            i++;
            if ((i % 3) === 1) { // 1, 4, 7, ....
                // mt: margin top
                if (i === 1) {
                    cardHTML += '<div class="carousel-item active">'
                }
                else {
                    cardHTML += '<div class="carousel-item">'
                }
            }
            cardHTML += '<div class="col-md-4" style="float:left">' +
                '<div class="card mb-2">' +
                '<img class="card-img-top mx-auto d-block" style="width:50%" src="' + item.imageURL + '" alt="Card image cap">' +
                '<div class="card-body">' +
                '<h4 class="card-title">' + item.name + '</h4>' +
                '<h5 class="card-text">' + item.title + '</h4>' +
                '<p class="card-text">' + item.background + '</p>' +
                '</div></div></div>';
            if ((i % 3) === 0 || i === length) { // 3, 6, 9, ..... 
                cardHTML += '</div>'
            }
        });
        // alert (cardHTML);
        document.getElementById("cardId").innerHTML = cardHTML;
    }
}