const electron = require('electron');
const { ipcRenderer } = electron;

// Envia a tag 'criar-nova-estrutura' quando carregar a tela principal
document.addEventListener("DOMContentLoaded", function(event) {
	ipcRenderer.send('criar-nova-estrutura')
});