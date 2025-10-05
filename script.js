// Este JS es puramente cosmético para la demo.
// No es necesario para el scraping del valor USD→EUR.
document.addEventListener('DOMContentLoaded', () => {
  const rate = document.getElementById('usd-eur-rate');
  if (rate) {
    rate.classList.add('pop');
    setTimeout(() => rate.classList.remove('pop'), 1200);
  }
});
