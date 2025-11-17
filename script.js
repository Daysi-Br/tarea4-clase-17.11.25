document.getElementById("btnConvertir").addEventListener("click", async () => {
    const montoUSD = document.getElementById("inputUSD").value;
    const resultadoDiv = document.getElementById("resultado");

    if (montoUSD === "" || isNaN(montoUSD) || montoUSD <= 0) {
        resultadoDiv.innerHTML = `<p style="color: red;">⚠️ Ingrese un monto válido.</p>`;
        return;
    }

    try {
        const url = "https://v6.exchangerate-api.com/v6/532a0ab86780bc913a5321fc/latest/USD";
        const response = await fetch(url);
        const data = await response.json();

        if (data.result !== "success") {
            resultadoDiv.innerHTML = `<p style="color:red;">No se pudo obtener la tasa de cambio.</p>`;
            return;
        }

        // Tasas
        const Gs = data.conversion_rates["PYG"];
        const ARS = data.conversion_rates["ARS"];
        const BRL = data.conversion_rates["BRL"];

        // Cálculos
        const valorGs = montoUSD * Gs;
        const valorArs = montoUSD * ARS;
        const valorBrl = montoUSD * BRL;

        // Mostrar
        resultadoDiv.innerHTML = `
            <h3>Resultados:</h3>
            <p><strong>🇵🇾 Guaraníes (PYG):</strong> ${valorGs.toLocaleString()}</p>
            <p><strong>🇦🇷 Peso Argentino (ARS):</strong> ${valorArs.toLocaleString()}</p>
            <p><strong>🇧🇷 Real Brasileño (BRL):</strong> ${valorBrl.toFixed(2)}</p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = `<p style="color:red;">Error al conectar con la API.</p>`;
    }
});
