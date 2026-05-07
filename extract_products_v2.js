(async () => {
  const links = Array.from(document.querySelectorAll('a'));
  const products = links.map(l => ({
    text: l.innerText.trim(),
    href: l.href
  })).filter(l => l.href.includes('detail.1688.com/offer/') && l.text.length > 10);
  
  // Deduplicate by href
  const uniqueProducts = [];
  const hrefs = new Set();
  for (const p of products) {
    if (!hrefs.has(p.href)) {
      uniqueProducts.push(p);
      hrefs.add(p.href);
    }
  }
  
  return { __result: uniqueProducts.slice(0, 5) };
})()