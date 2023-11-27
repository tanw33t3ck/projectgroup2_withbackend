function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Fetch the list of users from the server
    fetch('http://localhost:8080/users/all')
      .then(response => response.json())
      .then(users => {
        // Check if there is a user with the provided username and password
        for (var i = 0; i < users.length; i++) {
          if (username === users[i].username && password === users[i].password) {
            // Login successful
            alert('Login successful!');
            sessionStorage.setItem('loggedIn', 'true');
            var usernameProperCase = username.charAt(0).toUpperCase() + username.slice(1);
            sessionStorage.setItem('username', usernameProperCase);
            window.location.href = 'product_form.html';
            return;
          }
        }

        // If no match is found, show an error message
        alert('Invalid username or password. Please try again.');
      })
      .catch(error => console.error('Error fetching users:', error));
  }