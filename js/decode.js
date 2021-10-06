const defaultNoImage = "./images/noimage.png";

let formatImageSrc = "";

$(document).ready(function () {
    $("#Text-Code-Area").focus().select();
    $("#Preview-Image").attr("src", defaultNoImage);

    $("#Text-Code-Area").on("focus", function() {
        $("#Text-Code-Area").val("");

        if ($("#Text-Code-Area").val() === "") $("#Preview-Image").attr("src", defaultNoImage);
    });

    $("#Text-Code-Area").on("change paste", function() {
        setTimeout(function () { DecodeImage(); }, 100);
    });
});

function DecodeImage() {
    let getImageType = $("#Text-Code-Area").val();

    if (isBase64(getImageType)) {
        switch (getImageType.charAt(0)) {
            case "i":
                formatImageSrc = `data:image/png;base64, ${getImageType}`;
                break;

            case "/":
                formatImageSrc = `data:image/jpeg;base64, ${getImageType}`;
                break;

            case "R":
                formatImageSrc = `data:image/gif;base64, ${getImageType}`;
                break;

            case "Q":
                formatImageSrc = `data:image/bmp;base64, ${getImageType}`;
                break;

            default:
                formatImageSrc = defaultNoImage;
                break;
        }

        $.when($("#Preview-Image").attr("src", formatImageSrc)).then(function () { $("#Text-Code-Area").blur(); });
    }

    else $("#Preview-Image").attr("src", defaultNoImage);
};

function isBase64(str) {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
};
