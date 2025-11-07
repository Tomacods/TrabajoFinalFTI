// --- Algoritmo principal VRS ---
function VRS(A, w, T) {
  let n = A.length;
  if (n < w) return { cuenta: 0, p: 0 };

  // Suma inicial
  let S = 0;
  for (let i = 0; i < w; i++) S += A[i];

  let cuenta = 0;
  let prevS = S;
  let reinicios = 0;

  // Deslizamiento
  for (let i = 1; i <= n - w; i++) {
    let delta_est = Math.abs(A[i - 1] - A[i + w - 1]);

    if (delta_est < T) {
      S = S - A[i - 1] + A[i + w - 1];
    } else {
      reinicios++;
      S = 0;
      for (let j = 0; j < w; j++) {
        S += A[i + j];
      }
    }

    if (Math.abs(S - prevS) < T) cuenta++;
    prevS = S;
  }

  let p = reinicios / (n - w);
  return { cuenta, p };
}

// --- Ejecutar una vez ---
function runVRS() {
  const arrayInput = document.getElementById("arrayInput").value.trim();
  const w = parseInt(document.getElementById("windowInput").value);
  const T = parseFloat(document.getElementById("thresholdInput").value);
  let A;

  // Si el input es un número, generar arreglo aleatorio
  if (/^\d+$/.test(arrayInput)) {
    const n = parseInt(arrayInput);
    A = Array.from({ length: n }, () => Math.floor(Math.random() * 100));
  } else {
    A = arrayInput.split(",").map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
  }

  if (A.length < w) {
    document.getElementById("output").innerHTML = `⚠️ El tamaño del arreglo debe ser mayor que w (${w})`;
    return;
  }

  const start = performance.now();
  const { cuenta, p } = VRS(A, w, T);
  const end = performance.now();

  document.getElementById("output").innerHTML = `
    <strong>Resultados:</strong><br>
    Ventanas analizadas: ${A.length - w}<br>
    Ventanas con cambio < T: ${cuenta}<br>
    Reinicios: ${(p * 100).toFixed(2)}% (${p.toFixed(3)})<br>
    Tiempo: ${(end - start).toFixed(3)} ms
  `;
}

// --- Ejecutar múltiples veces para gráfico ---
let chart = null;

function runMultiple() {
  const w = parseInt(document.getElementById("windowInput").value);
  const T = parseFloat(document.getElementById("thresholdInput").value);

  // Definimos tamaños de n para probar
  const ns = [5000, 10000, 15000, 20000, 25000];
  const tiempos = [];
  const ps = [];

  for (let n of ns) {
    const A = Array.from({ length: n }, () => Math.floor(Math.random() * 100));
    const start = performance.now();
    const { p } = VRS(A, w, T);
    const end = performance.now();

    tiempos.push(end - start);
    ps.push(p * 100);
  }

  // Mostrar resultados rápidos
  document.getElementById("output").innerHTML = `
    <strong>Serie ejecutada con w=${w}, T=${T}</strong><br>
    n = [${ns.join(", ")}]<br>
    Tiempos (ms) = [${tiempos.map(t => t.toFixed(2)).join(", ")}]<br>
    p (%) = [${ps.map(x => x.toFixed(2)).join(", ")}]
  `;

  // Graficar resultados
  const ctx = document.getElementById("chart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ns,
      datasets: [
        {
          label: "Tiempo (ms)",
          data: tiempos,
          borderColor: "#00bcd4",
          borderWidth: 2,
          fill: false,
          tension: 0.2
        },
        {
          label: "Reinicios (%)",
          data: ps,
          borderColor: "#ff4081",
          borderWidth: 2,
          fill: false,
          tension: 0.2
        }
      ]
    },
    options: {
      scales: {
        x: { title: { display: true, text: "n (tamaño del arreglo)" } },
        y: { title: { display: true, text: "Valor" } }
      },
      plugins: {
        legend: {
          labels: { color: "#fff" }
        }
      }
    }
  });
}
