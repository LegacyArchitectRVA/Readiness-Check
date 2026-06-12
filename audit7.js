/* LA Digital Audit v19.3 - audit7.js
   v19.3 changes:
   - Added GA4 event tracking: audit_start, pillar_view, audit_complete, business_gate, email_submit, cta_click
   Changes from v16:
   - Results reordered: 52% stat -> pillar breakdown -> continuity score
   - Removed all em dashes
   - Removed section borders on results page
   - Embedded Cal.com inline calendar (replaces schedule button)
   - Added workbook CTA with promo image
   - Removed Founding Families section (links to #pricing instead)
   - Removed duplicate Schedule/Start Over buttons
   - Life Manual bolded throughout, trademark on first mention only
   - One link to #workbook, one to #pricing
*/
(function(){
  if(window.__laLoaded)return; window.__laLoaded=true;
  var lnk=document.createElement('link');
  lnk.rel='stylesheet';
  lnk.href='https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,300;1,6..96,400&display=swap';
  document.head.appendChild(lnk);