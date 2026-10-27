// Este JS es puramente cosmético para la demo.
// No es necesario para el scraping del valor USD→EUR y NUNCA modifica
// el contenido de #usd-eur-rate (solo lo lee).
document.addEventListener('DOMContentLoaded', () => {
  const rate = document.getElementById('usd-eur-rate');
  if (rate) {
    rate.classList.add('pop');
    setTimeout(() => rate.classList.remove('pop'), 1200);
  }

  // Sombra del header al hacer scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // Calculadora USD ⇄ EUR basada en la tasa mostrada en la página
  const amount = document.getElementById('converter-amount');
  const output = document.getElementById('converter-output');
  const swap = document.getElementById('converter-swap');
  const fromCur = document.getElementById('from-cur');
  const toCur = document.getElementById('to-cur');
  const fromLabel = document.getElementById('from-label');
  const toLabel = document.getElementById('to-label');
  const usdToEur = parseFloat(rate.textContent.replace(',', '.'));
  let inverted = false;

  const fmt = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const convert = () => {
    const n = parseFloat(amount.value) || 0;
    output.textContent = fmt.format(inverted ? n / usdToEur : n * usdToEur);
  };
  swap.addEventListener('click', () => {
    inverted = !inverted;
    [fromCur.innerHTML, toCur.innerHTML] = [toCur.innerHTML, fromCur.innerHTML];
    fromLabel.textContent = `Tú envías (${inverted ? 'EUR' : 'USD'})`;
    toLabel.textContent = `Tú recibes (${inverted ? 'USD' : 'EUR'})`;
    convert();
  });
  amount.addEventListener('input', convert);
  convert();

  // Aparición suave de secciones
  const targets = document.querySelectorAll('.rate-card, .service, .offices, .faq details, .cta-band');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }
});
