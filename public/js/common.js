var qr,url="";async function userEnteredURL(){let e=$("#urlField").val().trim();isRealUrl(e)?await $.post("/api/links",{content:e},(e,n,o)=>{$("#shortenedUrlField").val(e.link),shorteningSuccessful(),url=e.link}):alert("Your URL is invalid!")}function shorteningSuccessful(){$("#homeContainer").hide(),$("#linkContainer").css("display","flex"),$("#linkContainer").hide(),$("#linkContainer").fadeIn("slow"),$(".topNavigation").css("display","flex"),$(".topNavigation").hide(),$(".topNavigation").fadeIn("slow"),copyFunction(),showCopySuccessfulBanner()}function isRealUrl(e){return/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(e)}function showCopySuccessfulBanner(){var e=$("#copySuccessfulBanner");e.addClass("show"),setTimeout(()=>{e.removeClass("show")},3e3)}function copyFunction(){var e=document.getElementById("shortenedUrlField");e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}function generateQR(e){qr=new QRious({element:document.getElementById("qr-code"),size:200,value:e}),$("#qrGeneratorButton").fadeOut("slow")}$("#urlField").keydown(e=>{13===e.keyCode&&userEnteredURL()}),$(document).on("click","#submitButton",()=>{userEnteredURL()}),$(document).on("click","#copyButton",()=>{copyFunction(),showCopySuccessfulBanner()}),$(document).on("click",".finalLinkContainer",e=>{$("#shortenedUrlField").select()}),$(document).on("click",".topNavigation",e=>{$("#urlField").val(""),$(".qrHolder").hide(),$("#linkContainer").hide(),$("#homeContainer").css("display","flex"),$("#homeContainer").hide(),$("#homeContainer").fadeIn("slow"),$(".topNavigation").fadeOut("slow")}),$(document).on("click",".generateQRButton",()=>{generateQR(url),$(".qrHolder").fadeIn("slow")}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("serviceworker.js").then(e=>console.log("Success: ",e.scope)).catch(e=>console.log("Failure: ",e))});