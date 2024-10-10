const loader_div = document.createElement('div');
export default function decorate(block) {
  loader_div.classList = 'neeyat-loader';
  loader_div.innerHTML = `
    <div class='center'>
        <span class='spinner'> </span>
        <p> Please wait... </p>
    </div>
    `;

  block.innerHTML = '';
  loader(true);
}

export function loader(val) {
  if (window.location.href.includes('author')) {
    loader_div.style.display = 'none';
  }
  if (val) {
    document.body.prepend(loader_div);
  } else {
    loader_div.style.display = 'none';
  }
}
