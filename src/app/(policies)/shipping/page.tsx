import { PolicyPage, Section, P } from '@/components/PolicyPage'

export const metadata = { title: 'Shipping Policy — ANORA' }

export default function ShippingPage() {
  return (
    <PolicyPage eyebrow="Orders" title="Shipping Policy">

      <Section heading="Processing Time">
        <P>All orders are processed within 1–3 business days after payment confirmation. Orders placed on weekends or public holidays will be processed the next business day.</P>
      </Section>

      <Section heading="Delivery Timelines">
        <P><strong style={{ color: '#C8A46A' }}>Metro Cities</strong> — 3–5 business days</P>
        <P><strong style={{ color: '#C8A46A' }}>Tier 2 & Tier 3 Cities</strong> — 5–8 business days</P>
        <P><strong style={{ color: '#C8A46A' }}>Remote Areas</strong> — 7–12 business days</P>
        <P>These are estimated timelines and may vary due to courier delays, weather conditions, or public holidays.</P>
      </Section>

      <Section heading="Shipping Charges">
        <P>We offer <strong style={{ color: '#C8A46A' }}>free shipping</strong> on all orders across India. No minimum order value required.</P>
      </Section>

      <Section heading="Order Tracking">
        <P>Once your order is dispatched, you will receive a tracking number via email or WhatsApp. You can use this to track your shipment on the courier&apos;s website.</P>
      </Section>

      <Section heading="Packaging">
        <P>All ANORA products are carefully packaged to ensure they arrive in perfect condition. Fragile items are wrapped with protective material before shipping.</P>
      </Section>

      <Section heading="Damaged or Lost Shipments">
        <P>If your order arrives damaged or is lost in transit, please contact us within 48 hours of the expected delivery date. We will arrange a replacement or refund promptly.</P>
      </Section>

      <Section heading="International Shipping">
        <P>Currently, we ship only within India. International shipping will be available soon — follow us on Instagram for updates.</P>
      </Section>

      <Section heading="Contact">
        <P>For shipping-related queries, contact us at <strong style={{ color: '#C8A46A' }}>contact.anoralab@gmail.com</strong></P>
      </Section>

    </PolicyPage>
  )
}
