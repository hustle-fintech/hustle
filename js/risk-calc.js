function calculateRisk() {
  const balance = parseFloat(document.getElementById('balance').value);
  const riskPercent = parseFloat(document.getElementById('riskPercent').value);
  const resultDiv = document.getElementById('riskResult');

  if (isNaN(balance) || isNaN(riskPercent)) {
    resultDiv.style.display = 'none';
    alert("Please enter valid numbers in both fields.");
    return;
  }

  const riskAmount = (balance * (riskPercent / 100)).toFixed(2);

  resultDiv.innerHTML = `
    <h3>💡 <strong>Risk Summary</strong></h3>
    <p>You can risk: <strong>$${riskAmount}</strong> per trade</p>
  `;

  resultDiv.style.display = 'block';
}

function clearInputs() {
  document.getElementById('balance').value = '';
  document.getElementById('riskPercent').value = '';
  const resultDiv = document.getElementById('riskResult');
  resultDiv.style.display = 'none';
  resultDiv.innerHTML = '';
}
