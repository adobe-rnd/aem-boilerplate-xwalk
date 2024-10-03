function comparator(a, b) {
    if (a.innerText < b.innerText)
        return -1;
    if (a.innerText > b.innerText)
        return 1;
    return 0;
}

// Function to sort Data
export function sortElements(el) {
    // var subjects =
    //     el.querySelectorAll("[data-subject]");
    var subjectsArray = Array.from(el.children);
    let sorted = subjectsArray.sort(comparator);
    sorted.forEach(e => el.appendChild(e));
}