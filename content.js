chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SHOW_SUMMARY') {
    const summaryText = request.summary;

    // Create a modal element
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '20px';
    modal.style.right = '20px';
    modal.style.backgroundColor = 'white';
    modal.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    modal.style.zIndex = '10000';
    modal.style.maxWidth = '300px';
    modal.innerHTML = `
      <h3 style="color: #0011ff; font-size: 16px; font-weight: 600">Summary</h3>
      <p style="font-size: 14px; font-weight: 400; background-color: #f1f1f1;
        border-radius: 12px;">${summaryText}</p>
    `;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.marginTop = '8px';
    closeBtn.onclick = () => modal.remove();

    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    sendResponse({ status: 'shown' });
  }
});
