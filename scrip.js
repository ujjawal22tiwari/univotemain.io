// Function to check and show the message if on mobile or tablet
function checkDevice() {
    if (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)) {
         alert("This application is only supported on Windows. It is not supported on Android or mobile devices.");
        window.location.href = "unsupported.html"; // Or window.history.back();
    }
  }
 