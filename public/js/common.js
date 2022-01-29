var qr, url = ""
async function userEnteredURL() {
	let e = $("#urlField").val()
	isRealUrl(e)
		? await $.post("/api/links", { content: e }, (data, n, o) => {
                console.log(data)
				$("#shortenedUrlField").val(data.link),
					shorteningSuccessful(),
					(url = data.link)
		  })
		: alert("Your URL is invalid!")
}

function shorteningSuccessful() {
	$("#homeContainer").hide()
    $("#linkContainer").css("display", "flex")
    $("#linkContainer").hide()
    $("#linkContainer").fadeIn("slow")
    $(".topNavigation").css("display", "flex")
    $(".topNavigation").hide()
    $(".topNavigation").fadeIn("slow")
    copyFunction()
    showCopySuccessfulBanner()
}

function isRealUrl(e) {
	return  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=\/]{1,256}/.test(e)
}

function showCopySuccessfulBanner() {
	var e = $("#copySuccessfulBanner")
	e.addClass("show")
    setTimeout(() => {
        e.removeClass("show")
    }, 3e3)
}

function copyFunction() {
	var e = document.getElementById("shortenedUrlField")
	e.select(), e.setSelectionRange(0, 99999), document.execCommand("copy")
}
function generateQR(e) {
	;(qr = new QRious({
		element: document.getElementById("qr-code"),
		size: 200,
		value: e,
	}))
	$("#qrGeneratorButton").fadeOut("slow")
}

$("#urlField").keydown((e) => {
	13 === e.keyCode && userEnteredURL()
})

$(document).on("click", "#submitButton", async () => {
	await userEnteredURL()
})

$(document).on("click", "#copyButton", () => {
	copyFunction()
    showCopySuccessfulBanner()
})

$(document).on("click", ".finalLinkContainer", (e) => {
	$("#shortenedUrlField").select()
})

$(document).on("click", ".topNavigation", (e) => {
	$("#urlField").val("")
	$(".qrHolder").hide()
	$("#linkContainer").hide()
	$("#homeContainer").css("display", "flex")
	$("#homeContainer").hide()
	$("#homeContainer").fadeIn("slow")
	$(".topNavigation").fadeOut("slow")
})

$(document).on("click", ".generateQRButton", () => {
	generateQR(url), $(".qrHolder").fadeIn("slow")
})

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("serviceworker.js")
			.then((reg) => console.log("Success: ", reg.scope))
			.catch((err) => console.log("Failure: ", err))
	})
}
