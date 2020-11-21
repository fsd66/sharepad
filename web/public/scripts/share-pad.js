window.onload = () => {
    sharepadInit();
};

let socket = null;

function sharepadInit() {
    textAreas = document.getElementsByClassName("sharepad-textarea");
    [...textAreas].forEach((v) => {
        v.addEventListener("input", sharepadTextChange);
        v.value = "";
    });

    socket = io();
    socket.on("connection", (s) => {
        console.log("socket connection established")
    });

    socket.on("textstate-update", (text) => {
        console.log(`Text recieved: ${text}`);
        [...textAreas].forEach((v) => {
            v.value = text;
        });
    });
}

function sharepadTextChange(e) {
    console.log(e.target.value);
    socket?.emit("textstate", e.target.value);
}
