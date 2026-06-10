import { PolicyPage, Section, P } from '@/components/PolicyPage'

export const metadata = { title: 'Disclaimer — ANORA' }

export default function DisclaimerPage() {
  return (
    <PolicyPage eyebrow="Legal" title="Disclaimer">

      <Section heading="General Disclaimer">
        <P>The information provided on anoralab.in is for general informational purposes only. While we strive to keep all information accurate and up to date, we make no warranties of any kind regarding the completeness or accuracy of this information.</P>
      </Section>

      <Section heading="Product Information">
        <P>Fragrance experiences are highly personal and subjective. Scent perception varies from person to person based on skin chemistry, body temperature, and other factors. Product descriptions represent our best effort to communicate fragrance profiles and should be used as a guide only.</P>
      </Section>

      <Section heading="Allergies & Sensitivities">
        <P>Our fragrances contain natural and synthetic ingredients. If you have known allergies or sensitivities, please review the ingredient list before purchase. ANORA is not liable for any allergic reactions resulting from the use of our products.</P>
        <P>We recommend testing any new fragrance on a small area of skin before regular use.</P>
      </Section>

      <Section heading="External Links">
        <P>Our website may contain links to third-party websites. ANORA has no control over the content of those sites and accepts no responsibility for them.</P>
      </Section>

      <Section heading="Limitation of Liability">
        <P>To the fullest extent permitted by law, ANORA shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our products or website.</P>
      </Section>

      <Section heading="Contact">
        <P>For any questions regarding this disclaimer, contact us at <strong style={{ color: '#C8A46A' }}>contact.anoralab@gmail.com</strong></P>
      </Section>

    </PolicyPage>
  )
}
