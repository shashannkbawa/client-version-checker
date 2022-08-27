const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const isDev = require('electron-is-dev')
const { createHash } = require('crypto');

const directoryPath = ['/home/shashanksharma/Javascript/', '/home/shashanksharma/TEst'];

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

function getDirectoriesHash(directoryPath) {

    let latestHash = ''
    const newHash = [];
    let indexFile = 0;

    const files = fs.readdirSync(directoryPath)
    files.forEach(function (file) {
        let fileContent = fs.readFileSync(`${directoryPath}/${file}`)
        console.log(file);
        console.log(fileContent.toString());
        newHash[indexFile] = hash(fileContent.toString())
        indexFile++
    });

    latestHash = hash(newHash.toString())
    console.log(latestHash)
    return latestHash

}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true
        }
    })


    // and load the index.html of the app.
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`)

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    ipcMain.on('update-data', async (event, data) => {
        let updateData = []
        directoryPath.forEach(path => {
            let calculatedHash = getDirectoriesHash(path)
            updateData.push({
                hash: calculatedHash,
                path
            })
        })

        const response = await fetch("http://localhost:4000/updateDatabase", { //http://47.31.208.179:4000/getConfirmation
            method: 'POST',
            body: JSON.stringify(updateData),
            headers: { 'Content-Type': 'application/json' }
        })
        const dataFromServer = await response.json()
        mainWindow.webContents.send('update-confirmation', dataFromServer)
    })

    ipcMain.on('send-getFile-hostid', async (event, data) => {
        let hashData = []
        directoryPath.forEach(path => {
            let calculatedHash = getDirectoriesHash(path)
            hashData.push({
                hash: calculatedHash,
                path: path
            })
        })
        const response = await fetch("http://localhost:4000/getConfirmation", { //http://47.31.208.179:4000/getConfirmation
            method: 'POST',
            body: JSON.stringify(hashData),
            headers: { 'Content-Type': 'application/json' }
        })
        const dataFromServer = await response.json()
        console.log(dataFromServer);
        mainWindow.webContents.send('confirmation-data', dataFromServer)

    })



}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })


})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
