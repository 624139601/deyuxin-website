(() => {
    const headers = Array.from(document.querySelectorAll('thead th')).map(th => th.innerText.split('\n')[0].trim());
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const results = [];
    
    const uvIndex = headers.indexOf('访客数');
    const pvIndex = headers.indexOf('浏览量');
    const payBuyersIndex = headers.indexOf('支付买家数');
    const payAmountIndex = headers.indexOf('支付金额');
    
    for (const row of rows) {
        const productLink = row.querySelector('a[href*="detail.1688.com/offer/"]');
        if (!productLink) continue;
        
        const idMatch = productLink.href.match(/offer\/(\d+)\.html/);
        const id = idMatch ? idMatch[1] : '';
        const cells = row.cells;

        results.push({
            id: id,
            uv: uvIndex !== -1 ? cells[uvIndex].innerText.split('\n')[0].trim() : '0',
            pv: pvIndex !== -1 ? cells[pvIndex].innerText.split('\n')[0].trim() : '0',
            payBuyers: payBuyersIndex !== -1 ? cells[payBuyersIndex].innerText.split('\n')[0].trim() : '0',
            payAmount: payAmountIndex !== -1 ? cells[payAmountIndex].innerText.split('\n')[0].trim() : '0'
        });
    }
    return { headers, results };
})()