(() => {
    const rows = Array.from(document.querySelectorAll('tr'));
    const results = [];
    for (const row of rows) {
        const productLink = row.querySelector('a[href*="itemId="]');
        if (!productLink) continue;
        
        const idMatch = productLink.href.match(/itemId=(\d+)/);
        const id = idMatch ? idMatch[1] : '';
        
        // Columns: 商品 (0), 展现次数 (1), 访客数 (2), 支付买家数 (3), 支付转化率 (4), 支付金额 (5), 支付商品件数 (6)
        const cells = row.cells;
        if (cells.length < 7) continue;

        results.push({
            id: id,
            impressions: cells[1].innerText.split('\n')[0].trim(),
            uv: cells[2].innerText.split('\n')[0].trim(),
            payBuyers: cells[3].innerText.split('\n')[0].trim(),
            payAmount: cells[5].innerText.split('\n')[0].trim()
        });
    }
    return results;
})()