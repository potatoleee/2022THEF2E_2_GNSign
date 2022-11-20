pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

const btnUpload = document.querySelector("#upload__btn");

// // 跳轉到簽名頁面
// function jumpToSign(){
//     window.location.href="sign.html";
//   }

// // 使用原生 FileReader 轉檔
// function readBlob(blob) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.addEventListener("load", () => resolve(reader.result));
//       reader.addEventListener("error", reject);
//       reader.readAsDataURL(blob);
//     });
//   }
  
//   async function printPDF(pdfData) {
  
//     // 將檔案處理成 base64
//     pdfData = await readBlob(pdfData);
    
//     //將檔案存到localStorage
//     localStorage.setItem('uploadPdf',pdfData);
  
//     // 將 base64 中的前綴刪去，並進行解碼
//     const data = atob(pdfData.substring(Base64Prefix.length));
  
//     // 利用解碼的檔案，載入 PDF 檔及第一頁
//     const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
//     const pdfPage = await pdfDoc.getPage(1);
  
//     // 設定尺寸及產生 canvas
//     const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
  
//     // 設定 PDF 所要顯示的寬高及渲染
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//     const renderContext = {
//       canvasContext: context,
//       viewport,
//     };
//     const renderTask = pdfPage.render(renderContext);
  
//     // 回傳做好的 PDF canvas
//     return renderTask.promise.then(() => canvas);
//   }
  
  
// btnUpload.addEventListener("change", async (e) => {
//     const pdfData = await printPDF(e.target.files[0]);
   
//     // 儲存後跳轉至簽名頁面
//     jumpToSign();
//   });

document.querySelector("input").addEventListener("change", (e) => {
    if (e.target.files[0] === undefined) return;

    // 透過 input 所選取的檔案
    const file = e.target.files[0];

    // 產生fileReader物件
    const fileReader = new FileReader();

    // 將資料做處理
    fileReader.readAsDataURL(file);

    // 綁入事件監聽
    fileReader.addEventListener("load", () => {

      // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
    const pdfDataUrl = fileReader.result;
    localStorage.setItem("pdfdata", pdfDataUrl);
    location.href = "sign.html"; //進入下一頁
    });
});



