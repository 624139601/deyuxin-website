(async () => {
  const products = Array.from(document.querySelectorAll('.offer-list-row .offer-item-title a, .offer-list-row .offer-item-title, .offer-list-row .offer-item-image a'));
  const results = products.slice(0, 5).map(p => ({
    title: p.innerText || p.getAttribute('title'),
    url: p.href || p.getAttribute('href')
  })).filter(p => p.url);
  return { __result: results };
})()