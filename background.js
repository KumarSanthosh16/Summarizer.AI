chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'summarize',
    title: 'Summarize with AI',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'summarize') {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: getSelectedText,
      },
      async (results) => {
        const selectedText = results[0].result;

        const summary = await getSummaryFromAPI(selectedText);

        chrome.storage.local.set({ summary });
        chrome.action.openPopup(); // Open popup to show result
      }
    );
  }
});

function getSelectedText() {
  return window.getSelection().toString();
}

async function getSummaryFromAPI(text) {
  const res = await fetch(
    'https://summarizer-ai-g9qz.onrender.com/summarize/summarize',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    }
  );

  const data = await res.json();
  console.log(data);
  return data.summary || 'No summary available';
}
