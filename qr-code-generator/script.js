const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");

function generateQR() {
    const qrValue = qrText.value.trim();
    if (qrValue) {
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
        qrImage.style.display = 'block';
    } else {
        qrImage.style.display = 'none';
    }
}