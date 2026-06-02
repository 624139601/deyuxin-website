(async () => {
  const mapping = {
    "PET吸塑托盘圆形直径44mm周转盘": "DYX-PET-001",
    "33格PET透明内衬热压塑料托盘圆形直径49mm": "DYX-PET-002",
    "PET圆孔直径52mm冲压玩具零件": "DYX-PET-003",
    "PET圆形30格直径49mm透明塑料": "DYX-PET-004",
    "PET透明吸塑包装盒22格直径59mm": "DYX-PET-005",
    "56格方形内尺寸59*23*21厂家": "DYX-PET-006",
    "防渗漏透明吸塑托盘方形五金电子周转盘": "DYX-PET-007",
    "防静电吸塑PET/PS黑色透明托盘": "DYX-ESD-001"
  };

  const iframe = document.querySelector('iframe[src*="manage-home"]');
  if (!iframe) return { error: "Iframe not found" };
  const doc = iframe.contentDocument || iframe.contentWindow.document;

  const results = [];
  const rows = Array.from(doc.querySelectorAll('tr')).filter(tr => tr.innerText.includes('货号：') || tr.innerText.includes('ID：'));

  for (const [titlePart, newCode] of Object.entries(mapping)) {
    const row = rows.find(tr => tr.innerText.includes(titlePart));
    if (!row) {
      results.push({ titlePart, status: "Row not found" });
      continue;
    }

    // Find the edit icon for "货号". Usually it's an icon near the text.
    // In 1688, the "货号" is often editable via a small pencil icon.
    // Let's look for an element with a class or tag that might be the icon.
    // Based on common 1688 UI, it might be a span or i with a class like 'alib-icon-edit' or similar.
    const cells = Array.from(row.cells);
    const productCell = cells[1]; // Typically the second cell contains name and ID
    
    // Look for the edit icon specifically for the item code.
    const editIcon = Array.from(productCell.querySelectorAll('img, i, span')).find(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && (el.className.includes('edit') || el.src?.includes('edit') || (el.tagName === 'IMG' && !el.alt));
    });

    if (editIcon) {
        editIcon.click();
        await new Promise(r => setTimeout(r, 1000));
        const input = doc.querySelector('.next-input input, input[type="text"]'); // Common 1688 input
        if (input) {
            input.value = newCode;
            // Trigger input events
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Look for "Confirm" button (确定)
            const confirmBtn = Array.from(doc.querySelectorAll('button')).find(btn => btn.innerText.includes('确定') || btn.innerText.includes('OK'));
            if (confirmBtn) {
                confirmBtn.click();
                await new Promise(r => setTimeout(r, 2000));
                results.push({ titlePart, status: "Success", code: newCode });
            } else {
                results.push({ titlePart, status: "Confirm button not found" });
            }
        } else {
            results.push({ titlePart, status: "Input not found after clicking icon" });
        }
    } else {
        results.push({ titlePart, status: "Edit icon not found" });
    }
  }

  return results;
})()
