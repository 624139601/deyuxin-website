(() => {
    const iframe = document.querySelector('#iwc-work-topframe-viewport iframe');
    if (!iframe) return { error: "Iframe not found" };
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const rows = Array.from(doc.querySelectorAll('tr.next-table-row'));
    const data = rows.map(row => {
        const nameLink = row.querySelector('a.next-link');
        const img = row.querySelector('img');
        const idMatch = row.innerText.match(/ID：(\d+)/);
        const idText = idMatch ? idMatch[1] : '';
        const artNoMatch = row.innerText.match(/货号：([^\s]+)/);
        const artNo = artNoMatch ? artNoMatch[1] : '无';
        
        return {
            id: idText,
            name: nameLink ? nameLink.innerText.trim() : '',
            url: nameLink ? nameLink.href : '',
            img: img ? img.src : '',
            artNo: artNo,
            price: row.cells[2]?.innerText.trim().replace(/\s/g, '')
        };
    });
    return data;
})()