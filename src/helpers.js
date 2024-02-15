const sendData = (ws, data, ms) => {
  setTimeout(() => {
    ws.send(JSON.stringify(data));
  }, ms);
};

module.exports = {
  sendData,
};
