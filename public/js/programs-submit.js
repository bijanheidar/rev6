let retriveProgramsInCoursesForm = async () => {
    const url = `/allPrograms`;
    await fetch(url)
        .then(res => res.json())
        .then(res => jsonData = res);

    if (jsonData.length == 0) {
        document.getElementById("programId").innerHTML = "<h3>No Data yet..............</h3>";
    }
    else {
        var selectHTML = ""
        jsonData.forEach((item) => {
            selectHTML += "<option value='" + item._id + "'>" + item.title + "</option>";
        });
        document.getElementById("programId").innerHTML = selectHTML;
    }
}

let retriveProgramsInProgramHTML = async () => {
    const url = "/allPrograms";
    await fetch(url)
        .then(res => res.json())
        .then(res => jsonData = res);

    if (jsonData.length == 0) {
        document.getElementById("cardId").innerHTML = "<h3>No Data yet..............</h3>";
    }
    else {
        var cardHTML = "", i = 0;
        jsonData.forEach((item) => {
            // cardHTML +="<option value='"+ item._id + "'>" +item.title+ "</option>";
            i++;
            if ((i % 3) == 1) {
                // mt: margin top
                cardHTML += '<div class="row mt-3">'
            }

            cardHTML += '<div class="card-deck col-md-4" style="float:left">' +
                '<div class="card mb-2">' +
                '<img class="card-img-top mx-auto d-block" style="width:100%" src="' +
                item.imageURL +
                // item.imageURL +
                '" alt="Card image cap"><div class="card-body"><h4 class="card-title">' +
                item.title +
                '</h4><p class="card-text">' +
                item.desc +
                '</p></div></div></div>';
            if ((i % 3) == 0) {
                cardHTML += '</div>'
            }

        });
        document.getElementById("cardId").innerHTML = cardHTML;
    }
}