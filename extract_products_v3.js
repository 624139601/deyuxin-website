(() => {
    const rows = Array.from(document.querySelectorAll('tr'));
    const results = [];
    for (const row of rows) {
        const nameLink = row.querySelector('a[href*="detail.1688.com/offer/"]');
        if (!nameLink) continue;
        
        const img = row.querySelector('img');
        const text = row.innerText;
        const idMatch = text.match(/ID：(\d+)/);
        const artNoMatch = text.match(/货号：([^\s]+)/);
        
        // Price gradient is tricky, let's get the main price first
        const priceCell = row.cells[2];
        const priceText = priceCell ? priceCell.innerText.trim() : '';

        results.push({
            id: idMatch ? idMatch[1] : '',
            name: nameLink.innerText.trim(),
            url: nameLink.href,
            img: img ? img.src : '',
            artNo: artNoMatch ? artNoMatch[1] : '无',
            price: priceText
        });
    }
    return results;
})()