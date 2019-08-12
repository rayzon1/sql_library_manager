
const search = document.getElementById("searchBar");
const pageDiv = document.getElementById("paginationContainer");
const pageButtons = document.getElementsByClassName("buttonPage");
const tableList = document.getElementsByClassName("tdata");
const ul = createEl("ul", "class", "listContainer");
const pageNumbers = Math.ceil(tableList.length / 15);

/**
 * Event listener for search bar. Will display matches to search.
 */
search.addEventListener("keyup", e => {
  [...tableList].forEach(val => {
    val.innerHTML.toLowerCase().includes(e.target.value)
      ? (val.style.display = "")
      : (val.style.display = "none");
  });
});


/**
 * Function to create elements.
 */
function createEl(elem, attr, name) {
  let element = document.createElement(elem);
  element.setAttribute(attr, name);
  return element;
}

/**
 * Will show 15 book listings per page. Shows page
 * based on page number selected.
 */
function showPage(list, page) {
  let end = page * 15;
  let start = end - 15;
  for (let i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

/**
 * Creates the pagination buttons and displays below the body 
 * of the page.
 */
for (let i = 1; i <= pageNumbers; i++) {
  const li = createEl("li", "class", "listItem");
  const a = createEl("a", "href", "#");
  const button = createEl("button", "class", "buttonPage");
  li.appendChild(a);
  button.append(i);
  a.appendChild(button);
  ul.append(li);
  pageDiv.append(ul);
}

/**
 * Will add event listener to each pagination button 
 * displayed.
 */
[...pageButtons].forEach(val => {
  val.addEventListener("click", e => {
    showPage(tableList, e.target.innerText);
    [...pageButtons].forEach(val => {
      if (val.style.border) {
        val.style.border = "";
      }
    })
    e.target.style.border = "2px solid rgba(0, 177, 137, 0.8)";
  });
});


[...pageButtons][0].style.border = "2px solid rgba(0, 177, 137, 0.8)";
showPage(tableList, 1);

