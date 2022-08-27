
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendGetFileHostID: (data) => ipcRenderer.send('send-getFile-hostid', data),
    updateData: () => ipcRenderer.send('update-data'),
    updateConfirmData: (updateConfirmation) => ipcRenderer.on('update-confirmation', updateConfirmation),
    confirmationData: (data) => ipcRenderer.on('confirmation-data', data)
})
