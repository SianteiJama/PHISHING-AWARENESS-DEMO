// Toggle explain sections
document.querySelectorAll('.reveal-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const explain = btn.nextElementSibling;
    const visible = explain.style.display === 'block';
    explain.style.display = visible ? 'none' : 'block';
    btn.textContent = visible ? 'Why this is phishing' : 'Hide explanation';
  });
});

// Make defanged links show a tooltip with the safe (defanged) url on hover
document.querySelectorAll('.defanged').forEach(el=>{
  el.addEventListener('mouseenter', ()=> {
    const url = el.getAttribute('data-url') || el.textContent;
    el.title = `Defanged URL: ${url}`;
  });
});

// Quiz logic
function submitAnswer(chosenPhishing) {
  const result = document.getElementById('quiz-result');
  const correct = true; // in this example the correct answer is "phishing"
  if (chosenPhishing === correct) {
    result.textContent = '✅ Correct — this is a phishing attempt (look for unusual URLs and unexpected requests).';
    result.style.color = 'green';
  } else {
    result.textContent = '❌ Not quite — beware: unsolicited links and requests for immediate action are red flags.';
    result.style.color = 'crimson';
  }
}
document.getElementById("check-email").addEventListener("click", () => {
  const from = document.getElementById("email-from").value.toLowerCase();
  const subject = document.getElementById("email-subject").value.toLowerCase();
  const body = document.getElementById("email-body").value.toLowerCase();
  const resultEl = document.getElementById("check-result");

  let issues = [];

  // Check sender address
  if (from.includes("paypa1") || from.includes("apple-giveaway") || from.includes("verify")) {
    issues.push("Suspicious sender address.");
  }

  // Check for urgent or threatening language
  if (subject.includes("urgent") || subject.includes("verify") || subject.includes("win") || subject.includes("free")) {
    issues.push("Subject line looks suspicious (too urgent or 'too good to be true').");
  }

  // Check for suspicious links
  if (body.includes("http://") || body.includes("click here") || body.includes("login")) {
    issues.push("Body contains suspicious links or requests.");
  }

  // Final decision
  if (issues.length > 0) {
    resultEl.innerHTML = `🚨 This looks like a <strong>phishing email</strong>.<br>Reasons:<ul>${issues.map(i => `<li>${i}</li>`).join('')}</ul>`;
    resultEl.style.color = "crimson";
  } else {
    resultEl.innerHTML = `✅ This email looks <strong>safe</strong> (no obvious red flags found).`;
    resultEl.style.color = "green";
  }
});
