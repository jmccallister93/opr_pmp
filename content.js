// (async () => {
//   const { alienHives } = await import(chrome.runtime.getURL("listOfProxies.js"));
 
//   let indexNumber
//   window.addEventListener('resize', function(){
//    let width = window.innerWidth;
//     if(width < 901){
//       indexNumber = 0
//     } else {
//       indexNumber = 1
//     }
//     return indexNumber
//   })
    

//   document.body.addEventListener("click", (event) => {
//     console.log("Body click event fired");

//     // Check if the h5 has appeared
//     const h5Elements = document.querySelectorAll("h5.css-19gldcy");
//     h5Elements.forEach((element, index) => {
//       if (index >= 1) { // Skip the first h5 element (index 0)
//         // Cleanup any existing icons and text boxes
//         cleanupElement(element); 

//         handleNewElement(element);
//       }
//     });
//   });

//   // Function to cleanup existing icons and text boxes
//   const cleanupElement = (element) => {
//     const existingIcon = element.parentElement.querySelector("div");
//     if (existingIcon) {
//       existingIcon.remove();
//     }
//     const existingBox = element.parentElement.querySelector(".custom-text-box");
//     if (existingBox) {
//       existingBox.remove();
//     }
//   };

//   // Function to handle the h5 element (modified)
//   const handleNewElement = (element) => {

//     const text = element.textContent.trim();
//     let boxContent = "No Proxy Models";

//     alienHives.forEach((entry) => {
//       const key = Object.keys(entry)[0];
//       if (text.includes(key)) {
//         boxContent = `<ul style="padding-left: 1rem; margin: 0">${entry[key].map(item => `<li>${item}</li>`).join('')}</ul>`; 
//       }
//     });

//     // Create the icon
//     const icon = document.createElement("div");
//     icon.textContent = "Proxy Models ⚙️";
//     icon.style.cursor = "pointer";
//     icon.style.marginLeft = "10px";
//     icon.style.display = "inline-block";
//     icon.style.background ="rgb(81, 190, 240)";
//     icon.style.border = "1px solid black"
//     icon.style.borderRadius = "5px"
//     icon.style.padding = "2px"
//     icon.style.color = "rgb(0, 41, 70)"
//     icon.style.fontWeight = "600"

//     // Add click event to show a text box
//     icon.addEventListener("click", () => {
//       event.stopPropagation(); 

//       const existingBox = document.querySelector(".custom-text-box");
//       if (existingBox) {
//         existingBox.remove(); // Remove if already displayed
//         return;
//       }

//       const textBox = document.createElement("div");
//       textBox.className = "custom-text-box";
//       textBox.innerHTML = `
//             <div style="margin-left: 5px; width: max-content; padding: 2px; margin-top: 2px; position: relative; z-index: 999;">
//               <p>${boxContent}</p>
//             </div>
//           `;
//       element.parentElement.appendChild(textBox);
//     });

//     // Add the icon next to the target element
//     element.parentElement.appendChild(icon);
//   };

// })();


(async () => {
  const { proxyModels } = await import(chrome.runtime.getURL("listOfProxies.js"));
 
  let indexNumber = window.innerWidth < 901 ? 0 : 1;

  window.addEventListener('resize', function(){
    indexNumber = window.innerWidth < 901 ? 0 : 1;
  });

  const waitForElements = async () => {
    return new Promise(resolve => {
      const checkElements = () => {
        const elements = document.querySelectorAll("h5.css-19gldcy");
        if (elements.length > indexNumber) {
          resolve(elements);
        } else {
          setTimeout(checkElements, 50); // Check again in 50ms
        }
      };
      checkElements();
    });
  };

  document.body.addEventListener("click", async (event) => {
    console.log("Body click event fired");
    
    // Wait for elements to be available
    const h5Elements = await waitForElements();
    
    h5Elements.forEach((element, index) => {
      if (index >= indexNumber) {
        cleanupElement(element);
        handleNewElement(element);
      }
    });
  });

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

  const handleNewElement = (element) => {
    const text = element.textContent.trim();
    let boxContent = "No Proxy Models";
    
    proxyModels.forEach((entry) => {
      const key = Object.keys(entry)[0];
      if (text.includes(key)) {
        boxContent = `<ul style="padding-left: 1rem; margin: 0">${entry[key].map(item => `<li>${item}</li>`).join('')}</ul>`;
      }
    });

    const icon = document.createElement("div");
    icon.textContent = "Proxy Models ⚙️";
    icon.style.cursor = "pointer";
    icon.style.marginLeft = "10px";
    icon.style.display = "inline-block";
    icon.style.background = "rgb(81, 190, 240)";
    icon.style.border = "1px solid black";
    icon.style.borderRadius = "5px";
    icon.style.padding = "2px";
    icon.style.color = "rgb(0, 41, 70)";
    icon.style.fontWeight = "600";

    icon.addEventListener("click", (e) => {
      e.stopPropagation(); // Use the event from the parameter
      const existingBox = document.querySelector(".custom-text-box");
      if (existingBox) {
        existingBox.remove();
        return;
      }
      
      const textBox = document.createElement("div");
      textBox.className = "custom-text-box";
      textBox.innerHTML = `
        <div style="margin-left: 5px; width: max-content; padding: 2px; margin-top: 2px; position: relative; z-index: 999;">
          <p>${boxContent}</p>
        </div>
      `;
      element.parentElement.appendChild(textBox);
    });

    element.parentElement.appendChild(icon);
  };
})();