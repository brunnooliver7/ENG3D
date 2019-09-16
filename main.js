<<<<<<< HEAD
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer, dialog } = electron;
const utils = require('./utils');
const Store = require('electron-store');
const store = new Store()
const storage = require('electron-json-storage');
const fs = require('fs')

// Iniciar o aplicativo e abrir a tela de início
let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false
  });
  mainWindow.maximize()
  mainWindow.show()
  mainWindow.loadURL(`file://${__dirname}/HTML/Inicio.html`);
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

// Criar pasta para salvar arquivos
var defaultPath = app.getPath('documents') + '\\ENG3D files'
if (fs.existsSync(defaultPath)){}
else  {
  fs.mkdir(defaultPath, function(error){
    if(error) throw error;
  })
}

// Arquivo
const menuTemplate = [{
  label: 'Arquivo',
  submenu: [

    // Novo arquivo
    {
      label: 'Novo arquivo',
      click() {
        let estruturaObj = utils.criarEstruturaObj()
        store.set('estrutura', estruturaObj)  
        mainWindow.loadURL(`file://${__dirname}/HTML/Inicio.html`);
        dialog.showMessageBox({ 
          message: "Nova estrutura criada",
          buttons: ["OK"] 
        });
      }
    },
    // Abrir arquivo...
    {
      label: 'Abrir arquivo...',
      click() { 

        dialog.showOpenDialog((fileName) => {
          
          if(fileName === undefined){
            alert('Nenhum arquivo selecionado')
          }

          fs.readFile(fileName[0], "utf-8", (err, data) => {
            if(err){
              console.log('Não é possível ler o arquivo' + err.message);
              return
            }
            var estruturaObj = JSON.parse(data)
            store.set('estrutura', estruturaObj)
          })
       
        })

        mainWindow.loadURL(`file://${__dirname}/HTML/Inicio.html`);

      }
    },  
    // Salvar como...
    {
      label: 'Salvar como...',
      click() {
        dialog.showSaveDialog({ // api do electron que abre uma caixa de diálogo
          title: 'Salvar arquivo', // título
          defaultPath: defaultPath, // usar o caminho padrão que criamos
          buttonLabel: 'Salvar', // cria o botão 'salvar'
          filters: [{
            name: 'Arquivos ENG3D',
            extensions: ['json'] // filtros
          }]  
        }, function(files) { // função que roda em paralelo

          if (files) { // se ele receber algum nome...
            var chosenFilename = files.replace(/^.*[\\\/]/, '') // tira todos os caracteres especiais

            // Insere o nome do arquivo e salva no objeto 'estrutura'
            var estruturaObj = store.get('estrutura')
            estruturaObj.nome = chosenFilename
            store.set('estrutura', estruturaObj)

            storage.setDataPath(defaultPath)
            storage.set(chosenFilename, estruturaObj, function(error) {
              if (error) {
                  throw error
              }
            })

          }

        })
      }
    },
    // Sair
    {
      label: 'Sair',
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
      click() { app.quit() }
    }

  ]
  
},];

// Visualizar
if (process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'Visualizar',
    submenu: [
      { 
        label: 'Recarregar página',
        role: 'reload' 
      },
      {
        label: 'Inspecionar',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
=======
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer, dialog } = electron;
const utils = require('./utils');
const Store = require('electron-store');
const store = new Store()
const storage = require('electron-json-storage');
const fs = require('fs')

// Iniciar o aplicativo e abrir a tela de início
let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false
  });
  mainWindow.maximize()
  mainWindow.show()
  mainWindow.loadURL(`file://${__dirname}/HTML/Inicio.html`);
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

// Criar pasta para salvar arquivos
var defaultPath = app.getPath('documents') + '\\ENG3D files'
if (fs.existsSync(defaultPath)){}
else  {
  fs.mkdir(defaultPath, function(error){
    if(error) throw error;
  })
}

// Arquivo
const menuTemplate = [{
  label: 'Arquivo',
  submenu: [

    // Novo arquivo
    {
      label: 'Novo arquivo',
      click() {
        let estruturaObj = utils.criarEstruturaObj()
        store.set('estrutura', estruturaObj)  
        mainWindow.loadURL(`file://${__dirname}/HTML/Inicio.html`);
        dialog.showMessageBox({ 
          message: "Nova estrutura criada",
          buttons: ["OK"] 
        });
      }
    },
    // Abrir arquivo...
    {
      label: 'Abrir arquivo...',
      click() { 

        dialog.showOpenDialog((fileName) => {
          
          if(fileName === undefined){
            alert('Nenhum arquivo selecionado')
          }

          fs.readFile(fileName[0], "utf-8", (err, data) => {
            if(err){
              console.log('Não é possível ler o arquivo' + err.message);
              return
            }
            var estruturaObj = JSON.parse(data)
            store.set('estrutura', estruturaObj)
          })
       
        })

        mainWindow.loadURL(`file://${__dirname}/HTML/Inicio.html`);

      }
    },  
    // Salvar como...
    {
      label: 'Salvar como...',
      click() {
        dialog.showSaveDialog({ // api do electron que abre uma caixa de diálogo
          title: 'Salvar arquivo', // título
          defaultPath: defaultPath, // usar o caminho padrão que criamos
          buttonLabel: 'Salvar', // cria o botão 'salvar'
          filters: [{
            name: 'Arquivos ENG3D',
            extensions: ['json'] // filtros
          }]  
        }, function(files) { // função que roda em paralelo

          if (files) { // se ele receber algum nome...
            var chosenFilename = files.replace(/^.*[\\\/]/, '') // tira todos os caracteres especiais

            // Insere o nome do arquivo e salva no objeto 'estrutura'
            var estruturaObj = store.get('estrutura')
            estruturaObj.nome = chosenFilename
            store.set('estrutura', estruturaObj)

            storage.setDataPath(defaultPath)
            storage.set(chosenFilename, estruturaObj, function(error) {
              if (error) {
                  throw error
              }
            })

          }

        })
      }
    },
    // Sair
    {
      label: 'Sair',
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
      click() { app.quit() }
    }

  ]
  
},];

// Visualizar
if (process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'Visualizar',
    submenu: [
      { 
        label: 'Recarregar página',
        role: 'reload' 
      },
      {
        label: 'Inspecionar',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
>>>>>>> Versão 1.0.0
