
const generatePDF = async (name)=>{
    const {PDFDocument, rgb } = PDFLib;

    const exBytes = await fetch("./cert.pdf").then((res) => {
        return res.arrayBuffer();
    });

    const exFont = await fetch("./Montserrat-Bold.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);

    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(name, {
        x: 50,
        y: 50,
        size: 40,
        font: myFont,
        color:rgb(0,0,0),
      });

    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(uri, "HatiraBileti.pdf", { autoBom: true });
};

const submitBtn = document.getElementById("submitBtn")
const inputValue = document.querySelector("#name")

submitBtn.addEventListener("click", () => {
    const val= inputValue.value;
    generatePDF(val);
});
