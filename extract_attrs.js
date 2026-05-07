(function() {
    const attributes = {};
    // 1688 product detail attributes are usually in a table or list
    const attrItems = document.querySelectorAll('.offer-attr-item, .offer-attribute-item, .obj-content table tr');
    attrItems.forEach(item => {
        const key = item.querySelector('.offer-attr-item-name, .offer-attribute-name, td:first-child')?.innerText?.trim();
        const value = item.querySelector('.offer-attr-item-value, .offer-attribute-value, td:last-child')?.innerText?.trim();
        if (key && value) {
            attributes[key] = value;
        }
    });
    
    // Check for specific cross-border fields in the whole page text if not found in structured attributes
    const pageText = document.body.innerText;
    const missingFields = [];
    const fieldsToCheck = ["单件重量", "包装尺寸", "跨境出口资质", "CE", "FDA", "RoHS", "是否跨境专供"];
    
    fieldsToCheck.forEach(field => {
        if (!pageText.includes(field) && !Object.keys(attributes).some(k => k.includes(field))) {
            missingFields.push(field);
        }
    });

    return { attributes, missingFields, url: window.location.href };
})();