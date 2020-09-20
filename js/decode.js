const DefaultNoImage = "./images/noimage.png";

let FormatImageSrc = "";

$(document).ready(function ()
{
    $("#Text-Code-Area").focus().select();
    $("#Preview-Image").attr("src", DefaultNoImage);

    $("#Text-Code-Area").on("focus", function()
    {
        $("#Text-Code-Area").val("");

        if($("#Text-Code-Area").val() === "")
        {
            $("#Preview-Image").attr("src", DefaultNoImage);
        }
    });

    $("#Text-Code-Area").on("change paste", function()
    {
        setTimeout(function () { DecodeImage(); }, 100);
    });
});

function DecodeImage()
{
    let GetImageType = $("#Text-Code-Area").val();

    if(isBase64(GetImageType))
    {
        switch(GetImageType.charAt(0))
        {
            case "i":
                FormatImageSrc = `data:image/png;base64, ${GetImageType}`;
                break;

            case "/":
                FormatImageSrc = `data:image/jpeg;base64, ${GetImageType}`;
                break;

            case "R":
                FormatImageSrc = `data:image/gif;base64, ${GetImageType}`;
                break;

            case "Q":
                FormatImageSrc = `data:image/bmp;base64, ${GetImageType}`;
                break;

            default:
                FormatImageSrc = DefaultNoImage;
                break;
        }

        $.when($("#Preview-Image").attr("src", FormatImageSrc)).then(function () { $("#Text-Code-Area").blur(); });
    }

    else
    {
        $("#Preview-Image").attr("src", DefaultNoImage);
    }
};

function isBase64(str)
{
    try
    {
        return btoa(atob(str)) === str;
    }

    catch(err)
    {
        return false;
    }
};