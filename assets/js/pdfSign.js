//環境設定
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

const Base64Prefix = "data:application/pdf;base64,";
const pdfDataUrl = localStorage.getItem("pdfdata"); //存在localStorage的pdf路徑
let pageNum = 1, pdfPagesTotal = 1; //PDF起始頁面, 總頁面

// 使用原生 FileReader 轉檔
function readBlob(blob) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
    });
}

async function printPDF(data) {
    pageRendering = true;
    //載入 PDF 檔及第一頁
    const pdfDoc = await pdfjsLib.getDocument(data).promise;
    const pdfPage = await pdfDoc.getPage(pageNum);
    
    // 設定尺寸
    const viewport = pdfPage.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    //取得頁數 
    // pdfPagesTotal = pdfDoc.numPages;
    // document.getElementById('page_num').textContent = pageNum;
    // document.getElementById('page_count').textContent = pdfPagesTotal;

    // Render PDF page into canvas context 渲染
    const renderTask = pdfPage.render({
        canvasContext: ctx,
        viewport: viewport,
    });

    // 回傳做好的 PDF canvas
    return renderTask.promise.then(() => canvas);
}

async function pdfToImage(pdfData) {
    // 設定 PDF 轉為圖片時的比例
    const scale = 1 / window.devicePixelRatio;

    // 回傳圖片
    return new fabric.Image(pdfData, {
    id: "renderPDF",
    scaleX: scale,
    scaleY: scale,
    });
}

// 此處 canvas 套用 fabric.js
const canvas = new fabric.Canvas("canvas");
window.onload = fabricPdfCanvas();

// 用fabric繪製pdf到canvas背景
async function fabricPdfCanvas(){
    canvas.requestRenderAll();
    const pdfData = await printPDF(pdfDataUrl);
    const pdfImage = await pdfToImage(pdfData);

    // 透過比例設定 canvas 尺寸
    canvas.setWidth(pdfImage.width / window.devicePixelRatio);
    canvas.setHeight(pdfImage.height / window.devicePixelRatio);

    // 將 PDF 畫面設定為背景
    canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
}




const sign = document.querySelector(".sign");

// 若 localStorage 有資料才放入
if (localStorage.getItem("img")) {
  sign.src = localStorage.getItem("img");
}

sign.addEventListener("click", () => {
  if (!sign.src) return;

  fabric.Image.fromURL(sign.src, function (image) {

	  // 設定簽名出現的位置及大小，後續可調整
	  image.top = 400;
		image.scaleX = 0.5;
    image.scaleY = 0.5;
    canvas.add(image);
  });
});

// 引入套件所提供的物件
const pdf = new jsPDF();

const downloadPc = document.querySelector(".downloadPc");
const downloadPhone = document.querySelector(".downloadPhone");


downloadPc.addEventListener("click", () => {

  // 將 canvas 存為圖片
  const image = canvas.toDataURL("image/png");
  
  // 設定背景在 PDF 中的位置及大小
  const width = pdf.internal.pageSize.width;
  const height = pdf.internal.pageSize.height;
  pdf.addImage(image, "png", 0, 0, width, height);

  // 將檔案取名並下載
  pdf.save("download.pdf");
});

downloadPhone.addEventListener("click", () => {

  // 將 canvas 存為圖片
  const image = canvas.toDataURL("image/png");
  
  // 設定背景在 PDF 中的位置及大小
  const width = pdf.internal.pageSize.width;
  const height = pdf.internal.pageSize.height;
  pdf.addImage(image, "png", 0, 0, width, height);

  // 將檔案取名並下載
  pdf.save("download.pdf");
});


//https://mozilla.github.io/pdf.js/examples/
/**
 * Displays previous page.
 */
// function onPrevPage() {
//     if (pageNum <= 1) {
//         return;
//     }
//     pageNum--;
//     fabricPdfCanvas(); //重新繪製canvas
// }
// document.getElementById('prev').addEventListener('click', onPrevPage);

// /**
//  * Displays next page.
//  */
// function onNextPage() {
//     if (pageNum >= pdfPagesTotal) {
//         return;
//     }
//     pageNum++;
//     fabricPdfCanvas(); //重新繪製canvas
// }
// document.getElementById('next').addEventListener('click', onNextPage);