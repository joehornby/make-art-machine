let infoPanel = document.getElementById('info__panel');

function toggleInfoPanel() {
    if (infoPanel.classList.contains("hide")){
        infoPanel.classList.remove("hide");
    }else {
        infoPanel.classList.add("hide");
    }
}
