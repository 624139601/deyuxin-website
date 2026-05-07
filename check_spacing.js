(async () => {
  const h1 = document.querySelector('h1');
  const stats = Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes('15+ 年行业经验') && el.children.length === 0) || document.querySelector('.stats-container') || document.querySelector('.hero-stats');
  
  if (!h1 || !stats) {
    return { error: 'Elements not found', h1: !!h1, stats: !!stats };
  }

  const h1Rect = h1.getBoundingClientRect();
  const statsRect = stats.getBoundingClientRect();
  const gap = statsRect.top - h1Rect.bottom;

  const h1Style = window.getComputedStyle(h1);
  const statsStyle = window.getComputedStyle(stats);

  return {
    gap: gap,
    h1: {
      marginBottom: h1Style.marginBottom,
      paddingBottom: h1Style.paddingBottom,
      rect: h1Rect
    },
    stats: {
      marginTop: statsStyle.marginTop,
      paddingTop: statsStyle.paddingTop,
      rect: statsRect
    }
  };
})()