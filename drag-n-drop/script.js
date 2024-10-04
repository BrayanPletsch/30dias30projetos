let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");

for (let list of lists) {
    list.addEventListener("dragstart", function(e) {
        let selected = e.target;

        rightBox.addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        rightBox.addEventListener("drop", function() {
            rightBox.appendChild(selected);
            selected = null;
        });

        leftBox.addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        leftBox.addEventListener("drop", function() {
            leftBox.appendChild(selected);
            selected = null;
        });
    });
}
