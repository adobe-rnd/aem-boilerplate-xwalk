/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(rowIndex) {
    const cell = rowIndex ? document.createElement('td') : document.createElement('th');
    if (!rowIndex) cell.setAttribute('scope', 'col');
    return cell;
}

export function decorateTable(block) {
    block.classList.add('code');
    block.parentElement.classList.add('code-wrapper');
    const table = document.createElement('table');
    const div = document.createElement('div');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const header = !block.classList.contains('no-header');
    // if (header) table.append(thead);
    table.append(tbody);

    [...block.querySelector('ul')?.children].forEach((child, i) => {
        const row = document.createElement('tr');
        // if (header && i === 0) thead.append(row);
        // else 
        tbody.append(row);
        // [...child.firstElementChild?.firstElementChild?.children]?.forEach((col) => {
        [...child.querySelector('ul')?.children].forEach((col) => {
            const cell = buildCell(header ? i : i + 1);
            if (col.innerHTML.includes('img') && col.textContent.trim()) {
                col.remove();
                const p = document.createElement('p');
                const span = document.createElement('span');
                span.append(col.textContent.trim());
                p.append(col.querySelector('img'))
                p.append(span)
                cell.append(p);
            } else if (col.innerHTML.includes('img')) {
                col.remove();
                cell.append(col.querySelector('img'));
            } else {
                cell.innerHTML = col.innerHTML;
            }
            row.append(cell);
        });
    });
    block.innerHTML = '';
    div.append(table);
    block.append(div);
}
