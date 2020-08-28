// get a handle to the body, for adding stuff
const body = document.querySelector('body');

// create a header
const header = document.createElement("h2");
header.innerText = "Modul 1";
body.appendChild(header);

// create a p tag with port info
const p = document.createElement("p");
console.log(location.href);
p.innerText = "Information om anslutningen\nServer: " + location.hostname
                + "\nSökväg: " + location.pathname.slice(1)
                + "\nPort: " + location.port
                + "\nProtokoll: " + location.protocol.slice(0,-1);
body.appendChild(p);

// create a header with instructions
const instructions = document.createElement("h4");
instructions.innerText = "Klicka på ett element i listan för att modifiera det";
body.appendChild(instructions);

// create a list
const ul = document.createElement('ul');

// populate the list
for (let i = 0; i < 10; i++) {
    // create a list item
    const li = document.createElement('li');
    li.innerText = 'List-element ' + i;
    // add an event listener that modifies the class, attributes and inner text of the list item
    li.addEventListener("click", event => {
        if (event.target.hasAttribute("modified")) {
            let count = parseInt(event.target.getAttribute("modified"));
            count++;
            event.target.setAttribute("modified", count.toString());
            event.target.innerText = event.target.getAttribute("original-text") + " modifierad " + count + " gånger";
        } else {
            event.target.setAttribute("original-text", event.target.innerText);
            event.target.setAttribute("modified", "1");
            event.target.className = "modified";
            event.target.innerText += " modifierad 1 gång";
        }

    })
    // add the list item to the list
    ul.appendChild(li);
}

// add the list to the body
body.appendChild(ul);

// function for restoring list item
function restoreListItem(item) {
    item.className = "";
    item.removeAttribute("modified");
    item.innerText = item.getAttribute("original-text");
}

// create a button
const button = document.createElement("button");
button.innerText = "Återställ listan med querySelectorAll";
button.addEventListener('click', function(event) {
    // get modified list items with querySelectorAll (items that has the CLASS "modified")
    const listItemsToReset = document.querySelectorAll(".modified");
    // restore all items
    for (item of listItemsToReset) {
        restoreListItem(item);
    }
    // reset the result paragraf
    document.querySelector(".result").innerText = "";
});
body.appendChild(button);

// create another button
const button2 = document.createElement("button");
button2.innerText = "Återställ listan med filter";
button2.addEventListener('click', function(event) {
    // make an array from the child list to be able to use filter
    const children = Array.from(ul.children);
    // get modified list items by filtering  (items that has the ATTRIBUTE "modified")
    const listItemsToReset = children.filter(child => {
        return child.hasAttribute("modified");
    });
    // restore all items
    for (item of listItemsToReset) {
        restoreListItem(item);
    }
    // reset the result paragraf
    document.querySelector(".result").innerText = "";
});
body.appendChild(button2);

// create a div
const div = document.createElement("div");

// create a button
const reduce = document.createElement("button");
reduce.innerText = "Summera hur många gånger list-elementen modifierats";

// create a result paragraf
const result = document.createElement("p");
result.className = "result";

// add the reduce function to the reduce button
reduce.addEventListener('click', event => {
    // make an array from the child list to be able to use reduce
    const children = Array.from(ul.children);
    // get the total for times a list item has been modified with a reduce function
    const total = children.reduce((acc, curr) => {
        const count = parseInt(curr.getAttribute("modified"));
        console.log(count);
        if (count) {
            return acc + count;
        } else {
            return acc;
        }
    }, 0);
    // show the result
    result.innerText = "Summa: " + total;
})

// add elements to the div
div.appendChild(reduce);
div.appendChild(result);

// add the div to the body
body.appendChild(div);
