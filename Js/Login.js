$('.logIn').submit(function(e) {
    e.preventDefault();
    const username = $('#loginInput').val();
    const password = $('#loginPassword').val();
    const userData = {
        username: username,
        password: password
    };

    $.ajax({
        url: "https://www.fulek.com/data/api/user/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(data) {
            if (data.isSuccess) {
                var token = data.data.token;
                localStorage.setItem("token", token);

                $('#tokenDisplay').text("Login successful!");
                
                console.log(data)
                setTimeout(() => {  window.location.href = "Index.html"; }, 2000);
                
            } else {
                console.log(data)
                $('#tokenDisplay').text("Login failed. Please check your username and password.");
            }
        },
        error: function(error) {
            console.error("Login error:", error);
        }
    });
});

$('.register').submit(function(e) {
    e.preventDefault();
    const username = $('#registerInput').val();
    const password = $('#registerPassword').val();
    const userData = {
        username: username,
        password: password
    };

    $.ajax({
        url: "https://www.fulek.com/data/api/user/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(data) {
            if (data.isSuccess) {
                alert("Registration successful! You can now login with your credentials.");
            } else {
                alert("Registration failed. Please try again.");
            }
        },
        error: function(error) {
            console.error("Registration error:", error);
        }
    });
});