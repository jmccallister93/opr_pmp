// Wait for a specific element by observing DOM changes
const observeForElement = (targetSelector, timeout = 10000) => {
    const processedElements = new Set();

    return new Promise((resolve, reject) => {
      const observer = new MutationObserver(() => {
        const targetElement = document.querySelectorAll(targetSelector);

        targetElement.forEach((element) => {
            if (!processedElements.has(element)) {
              processedElements.add(element);
              handleNewElement(element); // Handle the new element
            }
          });
        // if (targetElement) {
        //   observer.disconnect(); // Stop observing once the element is found
        //   resolve(targetElement);
        // }
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
  
      // Set a timeout to avoid infinite waiting
      setTimeout(() => {
        observer.disconnect();
        reject(new Error("Element not found within the timeout period"));
      }, timeout);
    });
  };

// Function to handle a new element
const handleNewElement = (element) => {
    console.log("Element found:", element);
  
    // Create the icon
    const icon = document.createElement("div");
    icon.textContent = "⚙️";
    icon.style.cursor = "pointer";
    icon.style.marginLeft = "10px";
    icon.style.display = "inline-block";
  
    // Add click event to show a text box
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
          <p>Model X</p>
        </div>
      `;
      element.parentElement.appendChild(textBox);
    });
  
    // Add the icon next to the target element
    element.parentElement.appendChild(icon);
  };


// Define the selector
const targetSelector = "h5.MuiTypography-h5.css-19gldcy"; 

observeForElement(targetSelector)
  .then(() => {
    console.log("Initial observation complete!");
  })
  .catch((err) => console.warn(err.message));

// observeForElement(targetSelector)
//   .then((element) => {
//     console.log("Element found:", element);

//     // Create the icon
//     const icon = document.createElement("div");
//     icon.textContent = "⚙️";
//     icon.style.cursor = "pointer";
//     icon.style.marginLeft = "10px";
//     icon.style.display = "inline-block";

//     // Add click event to show a text box
//     icon.addEventListener("click", () => {
//       const existingBox = document.querySelector(".custom-text-box");
//       if (existingBox) {
//         existingBox.remove(); // Remove if already displayed
//         return;
//       }

//       const textBox = document.createElement("div");
//       textBox.className = "custom-text-box";
//       textBox.innerHTML = `
//         <div style="background: #fff; border: 1px solid #000; padding: 10px; margin-top: 10px; position: absolute; z-index: 999;">
//           <ul>
//             <li>Option A</li>
//             <li>Option B</li>
//             <li>Option C</li>
//           </ul>
//         </div>
//       `;
//       element.parentElement.appendChild(textBox);
//     });

//     // Add the icon next to the target element
//     element.parentElement.appendChild(icon);
//   })
//   .catch((err) => console.warn(err.message));

console.log("Content script loaded!");
