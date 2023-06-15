// Function to save pricing plans
const savePricingTable = (event) => {
  // Get the count of saved pricing plans
  let savedPlansCount = Object.keys(sessionStorage).filter(key => key.startsWith('savedPricingPlan')).length;

  // Generate a unique ID for the new plan
  let planId = savedPlansCount + 1;

  // Check if a plan with the same ID already exists
  let savedPlan = sessionStorage.getItem(`savedPricingPlan${planId}`);
  if (savedPlan) {
    let savedPlanObj = JSON.parse(savedPlan);
    console.log(savedPlanObj);
    alert('A pricing plan has already been saved for later!');
  } else {
    // Find the pricing item that triggered the event
    let pricingItem = event.target.closest('.p-card');

    // Extract plan details from the pricing item
    let plan = {
      title: pricingItem.querySelector('.h3').textContent,
      price: pricingItem.querySelector('.price h2').textContent,
      features: Array.from(pricingItem.querySelectorAll('.price-item li')).map(feature => feature.textContent)
    };

    // Store the plan in sessionStorage with the unique ID
    sessionStorage.setItem(`savedPricingPlan${planId}`, JSON.stringify(plan));

    // Display a success message with the number of saved plans
    alert(`Pricing plan saved for later! You have ${planId} item(s) in your "Save for later" folder.`);
  }
};

window.onload = () => {
  // Function to display the saved plans
  const displaySavedPlans = () => {
    // Get the saved plans list element
    const savedPlansList = document.getElementById('saved-plans-list');

    // Clear the existing content of the saved plans list
    savedPlansList.innerHTML = '';

    // Get the array of saved plans
    const savedPlans = getSavedPlans();

    // Get the count of saved plans
    const savedPlansCount = savedPlans.length;

    // If no plans have been saved
    if (savedPlansCount === 0) {
      // Display a message indicating no saved plans
      savedPlansList.innerHTML = '<p>No pricing plans have been saved yet.</p>';
      // Display an alert with the count of saved plans
      alert(`You have ${savedPlansCount} item(s) in your "Save for later" folder.`);
      return;
    }

    // Loop through the saved plans and display them
    savedPlans.forEach(plan => {
      const planItem = createPlanItem(plan);
      savedPlansList.appendChild(planItem);
    });

    // Display an alert with the count of saved plans
    alert(`You have ${savedPlansCount} item(s) in your "Save for later" folder.`);
  };

  // Function to retrieve the saved plans from sessionStorage
  const getSavedPlans = () => {
    // Create an array to store the saved plans
    const savedPlans = [];

    // Iterate through the sessionStorage keys
    for (let key in sessionStorage) {
      // Check if the key starts with 'savedPricingPlan'
      if (key.startsWith('savedPricingPlan')) {
        // Get the plan object from sessionStorage
        const plan = JSON.parse(sessionStorage.getItem(key));
        // Add the plan object to the savedPlans array
        savedPlans.push(plan);
      }
    }

    // Return the array of saved plans
    return savedPlans;
  };

  // Function to create a plan item element
  const createPlanItem = plan => {
    // Create a div element for the plan item
    const planItem = document.createElement('div');
    planItem.classList.add('plan-item');
    // Set the innerHTML of the plan item using the plan object
    planItem.innerHTML = `
      <h3>${plan.title}</h3>
      <div class="pi-price">
        <h2>${plan.price}</h2>
        <span>SINGLE CLASS</span>
      </div>
      <ul>
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    `;

    // Return the plan item element
    return planItem;
  };

  // Call the displaySavedPlans function to show the saved plans
  displaySavedPlans();
};


//function to save images to sessionstorage
const saveForLater = (className) => {
  // Retrieve the saved classes from sessionStorage
  let savedClasses = sessionStorage.getItem('savedClasses');

  // Parse the saved classes as JSON or create an empty array if it doesn't exist yet
  savedClasses = savedClasses ? JSON.parse(savedClasses) : [];

  // Check if the class is already saved
  if (!savedClasses.includes(className)) {
    // Add the class to the saved classes array
    savedClasses.push(className);

    // Save the updated array back to sessionStorage
    sessionStorage.setItem('savedClasses', JSON.stringify(savedClasses));

    // Update the button text
    const buttons = document.querySelectorAll(`[onclick="saveForLater('${className}')"]`);
    buttons.forEach(button => {
      button.innerText = 'Saved!';
      button.disabled = true;
    });
  } else {
    // The class is already saved
    console.log('Class is already saved.');
  }
}

// Get all "Save for Later" buttons
const saveButtons = document.querySelectorAll('.for-images');

// Add click event listener to each button
saveButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the closest parent element with the class "splide__slide"
    const slide = button.closest('.splide__slide');
    // Get the image source from the card image
    const imageSrc = slide.querySelector('.card-img-top').getAttribute('src');

    // Create a unique key for the saved image using the image source
    const key = `savedImage-${imageSrc}`;

    // Check if the image is already saved
    if (sessionStorage.getItem(key)) {
      alert(`This image is already saved for later.`);
      return;
    }

    // Save the image source to sessionStorage
    sessionStorage.setItem(key, imageSrc);

    alert(`The image has been saved for later.`);
  });
});

const displaySavedImages = () => {
  // Get the saved images list element
  const savedImagesList = document.getElementById('saved-images-list');

  // Clear the existing content of the saved images list
  savedImagesList.innerHTML = '';

  // Get the array of saved images
  const savedImages = getSavedImages();

  // Get the count of saved images
  const savedImagesCount = savedImages.length;

  // If no images have been saved
  if (savedImagesCount === 0) {
    // Display a message indicating no saved images
    savedImagesList.innerHTML = '<p>No images have been saved yet.</p>';
    // Display an alert with the count of saved images
    alert(`You have ${savedImagesCount} item(s) in your "Save for later" folder.`);
    return;
  }

  // Loop through the saved images and display them
  savedImages.forEach(imageSrc => {
    const image = document.createElement('img');
    image.setAttribute('src', imageSrc);
    image.setAttribute('alt', 'Saved image');
    savedImagesList.appendChild(image);
  });

  // Display an alert with the count of saved images
  alert(`You have ${savedImagesCount} item(s) in your "Save for later" folder.`);
};

const getSavedImages = () => {
  // Create an array to store the saved image sources
  const savedImages = [];

  // Iterate through the sessionStorage keys
  for (let key in sessionStorage) {
    // Check if the key starts with 'savedImage'
    if (key.startsWith('savedImage')) {
      // Get the image source from sessionStorage
      const imageSrc = sessionStorage.getItem(key);
      // Add the image source to the savedImages array
      savedImages.push(imageSrc);
    }
  }

  // Return the array of saved images
  return savedImages;
};

// Call the displaySavedImages function to show the saved images
displaySavedImages();
