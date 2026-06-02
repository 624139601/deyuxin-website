(() => {
    const rows = Array.from(document.querySelectorAll('tr.next-table-row'));
    const data = rows.map(row => {
        const nameLink = row.querySelector('a.next-link');
        const img = row.querySelector('img.next-table-cell-wrapper-img');
        const idText = row.innerText.match(/ID：(\d+)/)?.[1];
        const artNo = row.innerText.match(/货号：([^\s]+)/)?.[1] || '无';
        
        return {
            id: idText,
            name: nameLink ? nameLink.innerText.trim() : '',
            url: nameLink ? nameLink.href : '',
            img: img ? img.src : '',
            artNo: artNo,
            price: row.querySelector('.next-table-cell:nth-child(3)')?.innerText.trim()
        };
    });
    return data;
})()