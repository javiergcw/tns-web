export const generatePDF = async (elementId, fileName = "orden_de_compra.pdf") => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error("Elemento no encontrado para generar PDF");
    return;
  }

  const opt = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 1 }, // Máxima calidad
    html2canvas: { scale: 2, useCORS: true }, // Habilitar CORS para imágenes
    jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" }, // A4
  };

  try {
    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf().set(opt).from(element).save();
    console.log("PDF generado con éxito");
  } catch (error) {
    console.error("Error generando PDF:", error);
  }
};