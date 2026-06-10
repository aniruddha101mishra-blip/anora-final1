import { PolicyPage, Section, P } from '@/components/PolicyPage'

export const metadata = { title: 'About Us — ANORA' }

export default function AboutPage() {
  return (
    <PolicyPage eyebrow="Our Story" title="About ANORA">

      <Section heading="Who We Are">
        <P>ANORA is a luxury niche fragrance brand born from a single obsession — to create scents that don&apos;t just perfume the air, but transform the presence of those who wear them.</P>
        <P>Designed exclusively for those who love to leave a memorable, sophisticated impression wherever they step, ANORA is more than a fragrance. It is a statement of identity.</P>
      </Section>

      <Section heading="Our Philosophy">
        <P>At ANORA, we believe fragrance is the most intimate form of luxury — invisible, yet indelible. Every bottle we create is a memory waiting to be made.</P>
        <P>We source only the finest ingredients, selected with meticulous care. Each composition is crafted to tell a story — of places, emotions, and the people who wear them.</P>
      </Section>

      <Section heading="Our Promise">
        <P>Every fragrance note is chosen with intention. Every bottle crafted with care. Every drop carries the promise of an unforgettable impression.</P>
        <P>We stand behind every product we create. If you are ever unsatisfied, we are here to make it right.</P>
      </Section>

      <Section heading="Contact Us">
        <P>For any questions, collaborations, or bespoke fragrance enquiries, reach us at:</P>
        <P><strong style={{ color: '#C8A46A' }}>Email:</strong> contact.anoralab@gmail.com</P>
        <P><strong style={{ color: '#C8A46A' }}>Instagram:</strong>{' '}
          <a href="https://www.instagram.com/anora.lab" target="_blank" rel="noopener noreferrer" style={{ color: '#C8A46A' }}>@anora.lab</a>
        </P>
      </Section>

    </PolicyPage>
  )
}
