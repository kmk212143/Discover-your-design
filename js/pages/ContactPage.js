export function ContactPage() {
  return `
    <div class="contact-page container fade-in" style="padding: var(--space-4xl) 0;">
      <div style="text-align: center; margin-bottom: var(--space-4xl);">
        <h1 class="slide-up">Get in Touch</h1>
        <p class="slide-up stagger-1" style="max-width: 600px; margin: 0 auto;">Have a question about your design results or need technical support? Our team is here to help.</p>
      </div>
      
      <div class="grid-2 slide-up stagger-2" style="gap: var(--space-3xl);">
        <div>
          <div class="card">
            <h3 style="margin-bottom: var(--space-xl);">Send us a message</h3>
            <form style="display: flex; flex-direction: column; gap: var(--space-lg);" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
              <div class="grid-2" style="gap: var(--space-md);">
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" required>
                </div>
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" required>
                </div>
              </div>
              
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" required>
              </div>
              
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Subject</label>
                <input type="text" class="form-control" required>
              </div>
              
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Message</label>
                <textarea class="form-control" rows="5" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
        
        <div>
          <div style="margin-bottom: var(--space-3xl);">
            <h3 style="margin-bottom: var(--space-lg);">Contact Information</h3>
            <div style="display: flex; flex-direction: column; gap: var(--space-md);">
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); box-shadow: var(--shadow-sm);"><i class="ph ph-envelope-simple"></i></div>
                <div>
                  <div style="font-weight: 600;">Email</div>
                  <div style="color: var(--color-text-secondary);">hello@discoverdesign.com</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); box-shadow: var(--shadow-sm);"><i class="ph ph-phone"></i></div>
                <div>
                  <div style="font-weight: 600;">Phone</div>
                  <div style="color: var(--color-text-secondary);">+1 (555) 123-4567</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); box-shadow: var(--shadow-sm);"><i class="ph ph-map-pin"></i></div>
                <div>
                  <div style="font-weight: 600;">Office</div>
                  <div style="color: var(--color-text-secondary);">123 Design Avenue, Creative District</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card" style="padding: 0; overflow: hidden; height: 250px;">
            <div style="width: 100%; height: 100%; background: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800') center/cover; position: relative;">
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3);"></div>
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center; font-weight: 600; font-size: 1.25rem;">
                <i class="ph ph-map-pin-line" style="font-size: 2.5rem; margin-bottom: 0.5rem; display: block;"></i>
                Map Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
