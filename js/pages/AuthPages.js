import { store } from '../state.js';

export function AuthPages(type = 'login') {
  const isLogin = type === 'login';
  
  return `
    <div class="auth-page fade-in" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: var(--space-2xl) 0; background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface-hover) 100%);">
      <div class="card slide-up" style="width: 100%; max-width: 480px; padding: var(--space-3xl); box-shadow: var(--shadow-lg);">
        <div style="text-align: center; margin-bottom: var(--space-2xl);">
          <div style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: var(--space-sm);"><i class="ph ph-user-circle"></i></div>
          <h2>${isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>${isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to save your styles and results.'}</p>
        </div>
        
        <div id="auth-error-msg" style="display: none; background: rgba(217,83,79,0.1); color: var(--color-error); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-lg); border: 1px solid rgba(217,83,79,0.2); font-size: 0.9rem; text-align: center;"></div>
        <div id="auth-success-msg" style="display: none; background: rgba(85,107,47,0.1); color: var(--color-success); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-lg); border: 1px solid rgba(85,107,47,0.2); font-size: 0.9rem; text-align: center;"></div>
        
        <form id="auth-form" style="display: flex; flex-direction: column; gap: var(--space-lg);" novalidate>
          ${!isLogin ? `
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Full Name</label>
              <input type="text" id="auth-name" class="form-control" placeholder="Mariam Al-Fassi" required>
              <div class="error-text" id="err-name" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Full name is required.</div>
            </div>
          ` : ''}
          
          <div class="form-group" style="margin: 0;">
            <label class="form-label">Email Address</label>
            <input type="email" id="auth-email" class="form-control" placeholder="mariam@example.com" required>
            <div class="error-text" id="err-email" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Please enter a valid email.</div>
          </div>
          
          <div class="form-group" style="margin: 0;">
            <div style="display: flex; justify-content: space-between;">
              <label class="form-label">Password</label>
              ${isLogin ? `<a href="#" style="font-size: 0.875rem;">Forgot Password?</a>` : ''}
            </div>
            <div style="position: relative;">
              <input type="password" id="auth-password" class="form-control" placeholder="••••••••" required>
              <i class="ph ph-eye" id="toggle-pwd" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); cursor: pointer; color: var(--color-text-tertiary);"></i>
            </div>
            <div class="error-text" id="err-password" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Password is required.</div>
            
            ${!isLogin ? `
              <div id="pwd-strength" style="display: none;">
                <div style="display: flex; gap: 4px; margin-top: 8px;">
                  <div class="strength-bar" style="height: 4px; flex: 1; background: var(--color-border); border-radius: 2px;"></div>
                  <div class="strength-bar" style="height: 4px; flex: 1; background: var(--color-border); border-radius: 2px;"></div>
                  <div class="strength-bar" style="height: 4px; flex: 1; background: var(--color-border); border-radius: 2px;"></div>
                </div>
                <div id="pwd-strength-text" style="font-size: 0.75rem; color: var(--color-text-tertiary); margin-top: 4px; text-align: right;">Weak</div>
              </div>
            ` : ''}
          </div>

          ${!isLogin ? `
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Confirm Password</label>
              <div style="position: relative;">
                <input type="password" id="auth-confirm" class="form-control" placeholder="••••••••" required>
              </div>
              <div class="error-text" id="err-confirm" style="color: var(--color-error); font-size: 0.8rem; margin-top: 4px; display: none;">Passwords do not match.</div>
            </div>
          ` : ''}
          
          ${isLogin ? `
            <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; font-size: 0.9rem;">
              <input type="checkbox" checked style="width: 1rem; height: 1rem; accent-color: var(--color-primary);">
              Remember me
            </label>
          ` : ''}
          
          <button type="submit" id="auth-submit-btn" class="btn btn-primary" style="width: 100%; padding: 1rem; margin-top: var(--space-sm);">
            ${isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div style="display: flex; align-items: center; gap: var(--space-md); margin: var(--space-2xl) 0;">
          <div style="flex: 1; height: 1px; background: var(--color-border);"></div>
          <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">OR CONTINUE WITH</div>
          <div style="flex: 1; height: 1px; background: var(--color-border);"></div>
        </div>
        
        <div style="display: flex; gap: var(--space-md);">
          <button class="btn btn-secondary" style="flex: 1;"><i class="ph ph-google-logo"></i> Google</button>
          <button class="btn btn-secondary" style="flex: 1;"><i class="ph ph-apple-logo"></i> Apple</button>
        </div>
        
        <div style="text-align: center; margin-top: var(--space-2xl); font-size: 0.9rem;">
          ${isLogin ? 
            `Don't have an account? <a href="#/signup" style="font-weight: 600;">Sign up</a>` : 
            `Already have an account? <a href="#/login" style="font-weight: 600;">Log in</a>`
          }
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('page-rendered', (e) => {
  if (e.detail.path === 'login' || e.detail.path === 'signup') {
    const isLogin = e.detail.path === 'login';
    const form = document.getElementById('auth-form');
    
    // Toggle Password Visibility
    const togglePwd = document.getElementById('toggle-pwd');
    const pwdInput = document.getElementById('auth-password');
    if (togglePwd && pwdInput) {
      togglePwd.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
        togglePwd.className = type === 'password' ? 'ph ph-eye' : 'ph ph-eye-slash';
      });
    }

    // Password Strength Logic
    if (!isLogin && pwdInput) {
      pwdInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const strengthDiv = document.getElementById('pwd-strength');
        const bars = document.querySelectorAll('.strength-bar');
        const text = document.getElementById('pwd-strength-text');
        
        if (val.length > 0) {
          strengthDiv.style.display = 'block';
          let score = 0;
          if (val.length >= 6) score++;
          if (val.match(/[A-Z]/) && val.match(/[0-9]/)) score++;
          if (val.length >= 8 && val.match(/[^A-Za-z0-9]/)) score++;
          
          bars.forEach(b => b.style.background = 'var(--color-border)');
          if (score >= 1) { bars[0].style.background = 'var(--color-error)'; text.innerText = 'Weak'; }
          if (score >= 2) { bars[0].style.background = '#F2CC8F'; bars[1].style.background = '#F2CC8F'; text.innerText = 'Good'; }
          if (score >= 3) { bars[0].style.background = 'var(--color-success)'; bars[1].style.background = 'var(--color-success)'; bars[2].style.background = 'var(--color-success)'; text.innerText = 'Strong'; }
        } else {
          strengthDiv.style.display = 'none';
        }
      });
    }
    
    if (form) {
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        
        // Hide all previous errors
        document.querySelectorAll('.error-text').forEach(el => el.style.display = 'none');
        document.getElementById('auth-error-msg').style.display = 'none';
        document.getElementById('auth-success-msg').style.display = 'none';

        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;
        const btn = document.getElementById('auth-submit-btn');

        let isValid = true;
        
        // Validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          document.getElementById('err-email').style.display = 'block';
          isValid = false;
        }
        
        if (!password || (password.length < 6 && !isLogin)) {
          const errPwd = document.getElementById('err-password');
          errPwd.innerText = isLogin ? 'Password is required.' : 'Password must be at least 6 characters.';
          errPwd.style.display = 'block';
          isValid = false;
        }

        let name = '';
        if (!isLogin) {
          name = document.getElementById('auth-name').value.trim();
          if (!name) {
            document.getElementById('err-name').style.display = 'block';
            isValid = false;
          }
          const confirm = document.getElementById('auth-confirm').value;
          if (password !== confirm) {
            document.getElementById('err-confirm').style.display = 'block';
            isValid = false;
          }
        }

        if (!isValid) return;

        // Show Loading State
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; border-width: 2px; border-top-color: white;"></div>';
        btn.disabled = true;

        // Simulate Network Delay
        await new Promise(r => setTimeout(r, 800));

        try {
          if (isLogin) {
            store.login(email, password);
            const successMsg = document.getElementById('auth-success-msg');
            successMsg.innerText = 'Login successful! Redirecting...';
            successMsg.style.display = 'block';
            setTimeout(() => {
              window.location.hash = '#/dashboard';
            }, 500);
          } else {
            store.signUp(name, email, password);
            // Auto login after sign up
            store.login(email, password);
            const successMsg = document.getElementById('auth-success-msg');
            successMsg.innerText = 'Account created successfully! Redirecting...';
            successMsg.style.display = 'block';
            setTimeout(() => {
              window.location.hash = '#/dashboard';
            }, 800);
          }
        } catch (error) {
          const errorMsg = document.getElementById('auth-error-msg');
          errorMsg.innerText = error.message;
          errorMsg.style.display = 'block';
          btn.innerHTML = originalBtnText;
          btn.disabled = false;
        }
      });
    }
  }
});
