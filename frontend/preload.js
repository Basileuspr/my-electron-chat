const { contextBridge } = require('electron');
const axios = require('axios');

contextBridge.exposeInMainWorld('api', {
  chat: async (prompt) => {
    const res = await axios.post('http://localhost:11434/chat', { prompt });
    return res.data.response;
  }
});
