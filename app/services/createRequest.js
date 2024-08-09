export default function handler(req, res) {
  if (req.method === "POST") {
    const { shopping, products } = req.body;

    // Aquí puedes agregar la lógica para almacenar o procesar estos datos.
    // Podrías guardarlos en una base de datos o enviarlos a otro servicio.

    res
      .status(200)
      .json({
        message: "Compra y productos añadidos exitosamente",
        shopping,
        products,
      });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
