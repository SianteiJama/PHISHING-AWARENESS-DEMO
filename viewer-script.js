const emails = [
  {
    subject: "⚠ Urgent: Verify your PayPal account",
    from: "security@paypa1.com",
    body: "Your account has been flagged. Click <a href='#'>here</a> to verify.",
    isPhishing: true,
    reason: "The sender domain is fake (paypa1.com with a number), urgent tone, and suspicious link."
  },
  {
    subject: "Team Meeting Invitation",
    from: "hr@company.com",
    body: "Please join our scheduled HR meeting tomorrow at 10am via Teams.",
    isPhishing: false,
    reason: "Legitimate sender address and no suspicious links."
  },
  {
    subject: "🎁 Win a Free iPhone 15!",
    from: "promo@apple-giveaway.com",
    body: "Congratulations! Claim your free iPhone now. Click <a href='#'>here</a>.",
    isPhishing: true,
    reason: "Too good to be true, suspicious domain, and asks for personal info."
  }
];

const container = document.getElementById("email-container");

emails.forEach((email, index) => {
  const card = document.createElement("div");
  card.classList.add("email-card");

  card.innerHTML = `
    <h3>${email.subject}</h3>
    <p><strong>From:</strong> ${email.from}</p>
    <p>${email.body}</p>
    <button class="verify-btn" data-index="${index}">Verify</button>
    <p class="result" id="result-${index}"></p>
  `;

  container.appendChild(card);
});

// Add verify functionality
document.querySelectorAll(".verify-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const i = btn.getAttribute("data-index");
    const email = emails[i];
    const resultEl = document.getElementById(`result-${i}`);

    if (email.isPhishing) {
      resultEl.innerHTML = `🚨 This is a <strong>phishing email</strong>. Reason: ${email.reason}`;
      resultEl.style.color = "crimson";
    } else {
      resultEl.innerHTML = `✅ This looks <strong>legitimate</strong>. Reason: ${email.reason}`;
      resultEl.style.color = "green";
    }
  });
});
function goBack() {
  window.location.href = "index.html";  // takes user back to main awareness page
}
// Back button function
function goBack() {
  window.location.href = "index.html";
}

// Email verification function
function checkEmail() {
  const emailText = document.getElementById("emailInput").value.toLowerCase();
  const result = document.getElementById("result");

  // Simple phishing keyword checks
  if (emailText.includes("password") || 
      emailText.includes("urgent") || 
      emailText.includes("verify your account") ||
      emailText.includes("click here")) {
    
    result.innerHTML = "⚠️ This email looks suspicious. Be cautious!";
    result.style.color = "red";
  } else if (emailText.trim() === "") {
    result.innerHTML = "❌ Please paste an email first.";
    result.style.color = "gray";
  } else {
    result.innerHTML = "✅ This email looks safe (but always double-check manually).";
    result.style.color = "green";
  }
}
