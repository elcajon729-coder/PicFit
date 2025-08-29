let img = new Image();

document.getElementById("upload").addEventListener("change", function(e) {
	const file = e.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = function(event) {
		img.src = event.target.result;
	};

	reader.readAsDataURL(file);

	img.onload = function() {
		document.getElementById("width").value = img.width;
		document.getElementById("height").value = img.height;
	};
});

function resizeImage() {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = parseInt(document.getElementById("width").value);
	const height = parseInt(document.getElementById("height").value);
	const quality = parseFloat(document.getElementById("quality").value);

	canvas.width = width;
	canvas.height = height;
	ctx.drawImage(img, 0, 0, width, height);

	// Download resize & compressed image
	canvas.toBlob(function (blob) {
		const link = document.createElement("a");
		link.download = "resized-image.png";
		link.href = URL.createObjectURL(blob);
		link.click();
	}, "image/jpeg", quality);
}