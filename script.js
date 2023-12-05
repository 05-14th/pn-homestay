document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // You can implement your login logic here (e.g., check credentials, authenticate user)
  
    // For demonstration, let's simply log the input values
    console.log('Username:', username);
    console.log('Password:', password);
  
    // Redirect to a new page after successful login
    // window.location.href = 'dashboard.html'; // Uncomment this line to redirect to a dashboard page
  });
  