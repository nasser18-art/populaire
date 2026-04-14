document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Handle form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Hide error message
        errorMessage.style.display = 'none';

        // Identifiant pour Maxence Boitez
        const maxenceId = '59201746';
        const maxencePwd = 'Z4p7Q1k8R2';
        if (username === maxenceId && password === maxencePwd) {
            // Connexion réussie
            sessionStorage.setItem('accountStatus', 'active');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userFullName', 'Maxence Boitez');
            sessionStorage.setItem('accountBalance', '1000000.00');
            sessionStorage.setItem('clientNumber', maxenceId);
            sessionStorage.setItem('unlockAmount', '200000.00');

            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            }

            // Effet de chargement
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion en cours...';
            submitBtn.disabled = true;

            // Redirection après délai
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Show error
            errorText.textContent = 'Numéro de client ou code confidentiel incorrect';
            errorMessage.style.display = 'flex';

            // Shake animation
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
        }
    });

    // Check if user is remembered
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember-me').checked = true;
    }

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    // Forgot password link
    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Pour réinitialiser votre code confidentiel, veuillez contacter votre agence Société Générale ou appeler le service client au 09 69 36 96 96.');
        });
    }
});
