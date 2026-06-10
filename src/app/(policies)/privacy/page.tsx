import { PolicyPage, Section, P } from '@/components/PolicyPage'

export const metadata = { title: 'Privacy Policy — ANORA' }

export default function PrivacyPage() {
  return (
    <PolicyPage eyebrow="Legal" title="Privacy Policy">

      <Section heading="1. Information We Collect">
        <P>When you place an order or subscribe to our newsletter, we collect your name, email address, phone number, and delivery address. We use this information solely to process and deliver your order.</P>
      </Section>

      <Section heading="2. How We Use Your Information">
        <P>Your personal information is used to process orders, send order confirmations, and provide customer support. We may also send you promotional communications if you have opted in.</P>
        <P>We do not sell, trade, or rent your personal information to third parties.</P>
      </Section>

      <Section heading="3. Payment Security">
        <P>All payment transactions are processed by Cashfree, a PCI DSS compliant payment gateway. ANORA does not store your card or banking details.</P>
      </Section>

      <Section heading="4. Cookies">
        <P>Our website uses cookies to improve your browsing experience. You may disable cookies in your browser settings, though this may affect website functionality.</P>
      </Section>

      <Section heading="5. Data Retention">
        <P>We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy or as required by law.</P>
      </Section>

      <Section heading="6. Your Rights">
        <P>You have the right to access, correct, or delete your personal information at any time. Contact us at <strong style={{ color: '#C8A46A' }}>contact.anoralab@gmail.com</strong> to exercise these rights.</P>
      </Section>

      <Section heading="7. Changes to This Policy">
        <P>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</P>
      </Section>

      <Section heading="8. Contact">
        <P>For privacy-related concerns, contact us at <strong style={{ color: '#C8A46A' }}>contact.anoralab@gmail.com</strong></P>
      </Section>

    </PolicyPage>
  )
}
