(async () => {
  const { alienHives } = await import(chrome.runtime.getURL("listOfProxies.js"));
  console.log(alienHives);

  console.log("Script injected");

  document.body.addEventListener("click", (event) => {
    console.log("Body click event fired");

    // Check if a new "Hive Lord [1]" element has appeared
    const h5Elements = document.querySelectorAll("h5.MuiTypography-h5.css-19gldcy");
    h5Elements.forEach((element, index) => {
      if (index > 0) { // Skip the first h5 element (index 0)
        console.log("Hive Lord element found (not the first one)!");

        // Cleanup any existing icons and text boxes
        cleanupElement(element); 

        handleNewElement(element);
      }
    });
  });

  // Function to cleanup existing icons and text boxes
  const cleanupElement = (element) => {
    const existingIcon = element.parentElement.querySelector("div");
    if (existingIcon) {
      existingIcon.remove();
    }
    const existingBox = element.parentElement.querySelector(".custom-text-box");
    if (existingBox) {
      existingBox.remove();
    }
  };

  // Function to handle the h5 element (modified)
  const handleNewElement = (element) => {
    console.log("Element found:", element);

    const text = element.textContent.trim();
    let boxContent = "Default text";

    alienHives.forEach((entry) => {
      const key = Object.keys(entry)[0];
      if (text.includes(key)) {
        boxContent = `<ul><li>${entry[key].join(" / ")}</li></ul>`;
      }
    });

    // Create the icon
    const icon = document.createElement("div");
    icon.textContent = "⚙️";
    icon.style.cursor = "pointer";
    icon.style.marginLeft = "10px";
    icon.style.display = "inline-block";

    // Add click event to show a text box
    icon.addEventListener("click", () => {
      event.stopPropagation(); 

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

})();