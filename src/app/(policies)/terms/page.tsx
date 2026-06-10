import { PolicyPage, Section, P } from '@/components/PolicyPage'

export const metadata = { title: 'Terms & Conditions — ANORA' }

export default function TermsPage() {
  return (
    <PolicyPage eyebrow="Legal" title="Terms & Conditions">

      <Section heading="1. Acceptance of Terms">
        <P>By accessing and using anoralab.in, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</P>
      </Section>

      <Section heading="2. Products & Pricing">
        <P>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes. We reserve the right to change prices at any time without prior notice.</P>
        <P>Product images are for illustrative purposes. Actual product appearance may vary slightly.</P>
      </Section>

      <Section heading="3. Orders & Payment">
        <P>Orders are confirmed only upon successful payment. We accept payments via Credit/Debit Card, UPI, Net Banking, and Wallets through our secure payment partner Cashfree.</P>
        <P>ANORA reserves the right to cancel any order due to stock unavailability, pricing errors, or suspected fraudulent activity.</P>
      </Section>

      <Section heading="4. Shipping">
        <P>We ship across India. Delivery timelines are estimates and may vary. Please refer to our Shipping Policy for full details.</P>
      </Section>

      <Section heading="5. Returns & Refunds">
        <P>Due to the nature of fragrance products, we do not accept returns once a product has been opened or used. Damaged or incorrect items must be reported within 48 hours of delivery.</P>
        <P>Refunds are processed within 7–10 business days upon approval.</P>
      </Section>

      <Section heading="6. Intellectual Property">
        <P>All content on this website — including text, images, videos, and branding — is the intellectual property of ANORA and may not be reproduced without written permission.</P>
      </Section>

      <Section heading="7. Limitation of Liability">
        <P>ANORA shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</P>
      </Section>

      <Section heading="8. Governing Law">
        <P>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.</P>
      </Section>

      <Section heading="9. Contact">
        <P>For any queries regarding these terms, contact us at <strong style={{ color: '#C8A46A' }}>contact.anoralab@gmail.com</strong></P>
      </Section>

    </PolicyPage>
  )
}
