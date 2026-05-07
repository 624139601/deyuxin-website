(function() {
    const attributes = {};
    const rows = document.querySelectorAll('tr, .offer-attr-item, .offer-attribute-item');
    rows.forEach(row => {
        const key = row.querySelector('th, .offer-attr-item-name, .offer-attribute-name, td:first-child')?.innerText?.trim();
        const value = row.querySelector('td, .offer-attr-item-value, .offer-attribute-value, td:last-child')?.innerText?.trim();
        if (key && value && key.length < 50) {
            attributes[key] = value;
        }
    });
    
    const pageText = document.body.innerText;
    const checkFields = ["单件重量", "包装尺寸", "跨境出口资质", "CE", "FDA", "RoHS", "跨境专供"];
    const found = {};
    checkFields.forEach(f => {
        found[f] = pageText.includes(f) || Object.keys(attributes).some(k => k.includes(f));
    });

    return { attributes, found, url: window.location.href };
})()