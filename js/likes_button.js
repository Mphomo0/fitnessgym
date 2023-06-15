//like button
// Define an array of button IDs
const buttonIds = ['clickme1', 'clickme2', 'clickm35', 'clickme4', 'clickme5', 'clickme6'];

// Initialize an empty array to store the counts
const counts = [];

// Loop through each button ID and set up the event listener
buttonIds.forEach((buttonId, index) => {
  // Get the button element
  const button = document.getElementById(buttonId);

  // Set the initial count to 0
  counts[index] = 0;

  // Add event listener to the button
  button.addEventListener('click', function() {
    event.preventDefault(); // Prevent the default behavior
    counts[index]++;
    button.innerHTML = `<i class="fa fa-solid fa-thumbs-up"></i>: ${counts[index]}`;
  });
});