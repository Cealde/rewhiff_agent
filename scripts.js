let buttonCount = 0;

const presetValues = ['vyse', 'sage', 'cypher', 'killjoy', 'deadlock', 'chamber', 'omen', 'brimstone', 'clove', 'astra', 'harbor', 'viper', 'reyna', 'raze', 'iso', 'neon', 'yoru', 'phoenix', 'jett', 'gekko', 'kay/o', 'breach', 'fade', 'sova', 'skye','tejo','waylay'];
const usedValues = {}; // Track used values for each button

document.getElementById('addButton').addEventListener('click', function () {
    buttonCount++;

    // Create a new button wrapper div
    let buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('buttonWrapper');

    // Create a new glass button element
    let newButton = document.createElement('button');
    newButton.textContent = "Player " + buttonCount; // Changed the button name
    newButton.classList.add('glassButton');
    newButton.contentEditable = true;  // Makes button name editable
    newButton.spellcheck = false;      // Disable red lines for typos
    newButton.style.outline = "none";  // Removes the outline when clicked for editing

    // Clear preset text when user starts typing
    newButton.addEventListener('input', function() {
        // Clear random text when user starts typing
        const randomTextDiv = buttonWrapper.querySelector('.randomText');
        randomTextDiv.textContent = ""; // Clear the random text when editing
    });

    let trashIcon = document.createElement('button');
    trashIcon.classList.add('trashIcon');

    // Create the image for the trash icon
    let trashImage = document.createElement('img');
    trashImage.src = "images/trash.png";  // Replace with actual image URL
    trashIcon.appendChild(trashImage);
    
    // Event listener for removing the button when the trash icon is clicked
    trashIcon.addEventListener('click', function () {
        buttonWrapper.remove();  // Remove the entire button wrapper when the trash icon is clicked
        delete usedValues[newButton.textContent]; // Clean up used values for removed button
    });

    // Append the new button and the trash icon to the wrapper
    buttonWrapper.appendChild(newButton);
    buttonWrapper.appendChild(trashIcon);

    // Append the button wrapper to the container
    const randomTextDiv = document.createElement('div');
    randomTextDiv.classList.add('randomText');
    randomTextDiv.textContent = ""; // Initially empty
    buttonWrapper.appendChild(randomTextDiv); // Append to the wrapper

    // Initialize used values for this button
    usedValues[newButton.textContent] = []; // Store the used values for this button

    // Append the button wrapper to the container
    document.getElementById('buttonContainer').appendChild(buttonWrapper);

    // Set focus on the new button for immediate editing
    newButton.focus();
});

// Randomize button functionality
document.getElementById('randomizeButton').addEventListener('click', function () {
    const buttonWrappers = document.querySelectorAll('.buttonWrapper');
    let anyUsedUp = false; // Track if any button has exhausted its values
    let allUsedValues = new Set(); // Track all used values across buttons

    buttonWrappers.forEach(wrapper => {
        const randomTextDiv = wrapper.querySelector('.randomText'); // Find existing random text div
        const buttonName = wrapper.querySelector('button.glassButton').textContent; // Get the correct button name
        const used = usedValues[buttonName] || []; // Get used values for this button
        let availableValues = presetValues.filter(value => !used.includes(value) && !allUsedValues.has(value)); // Filter out used values globally

        if (availableValues.length > 0) {
            // Randomly select a value from available values
            const randomIndex = Math.floor(Math.random() * availableValues.length);
            const randomValue = availableValues[randomIndex];

            // Update the text in the random text div
            randomTextDiv.textContent = randomValue;

            // Mark this value as used
            used.push(randomValue);
            usedValues[buttonName] = used; // Update the used values for this button
            allUsedValues.add(randomValue); // Add to the global used values
        } else {
            // Mark that this button has exhausted its values
            randomTextDiv.textContent = "All values used!";
            anyUsedUp = true; // At least one button has used up all values
        }
    });

    // Reset used values if any button has exhausted its values
    if (anyUsedUp) {
        Object.keys(usedValues).forEach(key => {
            usedValues[key] = []; // Reset the used values for each button
        });
    }
});
