(async () => {
  // Import proxies list
  const { alienHives } = await import(chrome.runtime.getURL("listOfProxies.js"));
  console.log(alienHives);

  // Function to handle the logic when the unitSelection is clicked
  const handleUnitSelectionClick = (event) => {
    console.log("Unit selection clicked!", event);

    const text = event.target.textContent.trim();
    console.log("Clicked content:", text);

    // Handle logic for "Alien Hives" or other selections
    if (text.includes("Alien Hives")) {
      console.log("Alien Hives selected!");
      // Add any additional logic specific to Alien Hives if needed
    } else {
      console.log("Different selection made!");
    }
  };

  // Observe DOM changes to identify when target elements are added
  const observeForElement = (targetSelector) => {
    const processedElements = new Set();

    return new Promise((resolve, reject) => {
      const observer = new MutationObserver(() => {
        const targetElements = document.querySelectorAll(targetSelector);
        targetElements.forEach((element) => {
          if (!processedElements.has(element)) {
            processedElements.add(element);
            handleNewElement(element); // Handle newly added elements
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Timeout to prevent infinite waiting
      setTimeout(() => {
        observer.disconnect();
        reject(new Error("Element not found within the timeout period"));
      }, timeout);
    });
  };

  // Function to dynamically create content in the new element
  const handleNewElement = (element) => {
    console.log("New element found:", element);

    const text = element.textContent.trim();
    let boxContent = "Default text"; 

    if (text.includes("Alien Hives")) {
      // Build the list dynamically for "Alien Hives"
      const listItems = alienHives.map(
        (entry) => `<li>${Object.keys(entry)[0]}: ${entry[Object.keys(entry)[0]].join(" / ")}</li>`
      ).join("");
      boxContent = `<ul>${listItems}</ul>`;
    } else {
      // Handle other alienHives cases or different selections
      alienHives.forEach((entry) => {
        const key = Object.keys(entry)[0];
        if (text.includes(key)) {
          boxContent = `<ul><li>${entry[key].join(" / ")}</li></ul>`;
        }
      });
    }

    // Create the icon
    const icon = document.createElement("div");
    icon.textContent = "⚙️";
    icon.style.cursor = "pointer";
    icon.style.marginLeft = "10px";
    icon.style.display = "inline-block";

    // Add click event to show a text box with the content
    icon.addEventListener("click", () => {
      const existingBox = document.querySelector(".custom-text-box");
      if (existingBox) {
        existingBox.remove(); // Remove if already displayed
        return;
      }

      const textBox = document.createElement("div");
      textBox.className = "custom-text-box";
      textBox.innerHTML = `
        <div style="background: #000; border: 1px solid #000; padding: 10px; margin-top: 10px; position: relative; z-index: 999;">
          <p>${boxContent}</p>
        </div>
      `;
      element.parentElement.appendChild(textBox);
    });

    // Add the icon next to the target element
    element.parentElement.appendChild(icon);
  };

  // Set up the listener for unitSelection
  document.addEventListener("DOMContentLoaded", () => {
    const unitSelection = document.getElementById("unitSelection");

    if (unitSelection) {
      unitSelection.addEventListener("click", handleUnitSelectionClick);
    } else {
      console.warn("Element with id 'unitSelection' not found!");
    }
  });

  // Start observing for the target element
  const targetSelector = "h5.MuiTypography-h5.css-19gldcy"; // Your specific target selector
  observeForElement(targetSelector)
    .then(() => {
      console.log("Initial observation complete!");
    })
    .catch((err) => console.warn(err.message));

})();
