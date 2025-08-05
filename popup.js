chrome.storage.local.get('summary', ({ summary }) => {
  document.getElementById('summary').innerText = summary || 'No summary found.';
});
