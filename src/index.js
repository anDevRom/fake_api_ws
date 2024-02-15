const { createServer } = require("http");
const { WebSocketServer } = require("ws");

const { sendData } = require("./helpers");

// Documents templates
const serverDocuments = createServer();
const wssDocuments = new WebSocketServer({ server: serverDocuments });

wssDocuments.on("connection", (ws) => {
  console.log("connection");
  setTimeout(() => {
    ws.send(
      JSON.stringify({
        url: "http://localhost:8080/documents/document_mock.pdf",
      })
    );
  }, 3_000);
  ws.on("close", () => {
    console.log("document socket close");
  });
});

serverDocuments.listen(8081);
//

// Sims registration
const serverSims = createServer();
const wssSims = new WebSocketServer({ server: serverSims });

wssSims.on("connection", (ws) => {
  console.log("connection");

  const QR_URL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/2048px-QR_code_for_mobile_English_Wikipedia.svg.png";

  ws.on("message", () => {
    console.log("message");

    sendData(
      ws,
      {
        simCards: [
          {
            simCardId: 0,
            statusId: 1,
            payments: [
              {
                paymentQr: "",
                rejectionReason: "",
              },
            ],
            eSimQr: "",
          },
        ],
      },
      1000
    );
    sendData(
      ws,
      {
        simCards: [
          {
            simCardId: 0,
            statusId: 2,
            payments: [
              {
                paymentQr: "",
                rejectionReason: "",
              },
            ],
            eSimQr: "",
          },
        ],
      },
      2000
    );
    sendData(
      ws,
      {
        simCards: [
          {
            simCardId: 0,
            statusId: 3,
            payments: [
              {
                paymentQr: QR_URL,
                rejectionReason: "",
              },
            ],
            eSimQr: QR_URL,
          },
        ],
      },
      3000
    );
  });

  ws.on("close", () => {
    console.log("close");
  });
});

serverSims.listen(8082);
//
