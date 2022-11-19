// 因為是以外部引入的方式使用套件，因此需要做環境設定
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";
const selectFile = document.querySelector(".select");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


// 參數的部份請先將 PDF 放入專案資料夾內，並寫入路徑

async function renderPDF(data){
    const pdfDoc = await pdfjsLib.getDocument(data).promise;
    const pdfPage = await pdfDoc.getPage(1);
    const viewport = pdfPage.getViewport({scale:1});
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    //實際渲染
    pdfPage.render({
        canvasContext: ctx,
        viewport: viewport,
    });
}


selectFile.addEventListener("change", (e) => {
    if (e.target.files[0] === undefined) return;

    //透過 input 所選取的檔案
    const file = e.target.files[0];

    //產生fileReader物件
    const fileReader = new FileReader();

    //將資料做處理
    fileReader.readAsArrayBuffer(file);

    //綁入事件監聽
    fileReader.addEventListener("load",() => {

        //獲取readAsArrayBuffer產生的結果，並用來炫染PDF
        const typedarray = new Uint8Array(fileReader.result);
        renderPDF(typedarray);
    });
});




