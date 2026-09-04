import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoMark } from '../components/icons/Logo';
import { Button } from '../components/ui/Button';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { ArrowRight } from '../components/icons/UiIcons';
import { company } from '../data/site';
import { useI18n } from '../i18n/useI18n';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT';
  path: string;
  summary: string;
  request?: string;
  response: string;
}

const BASE = 'https://api.catlanticpartners.com/v1';

const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/bookings',
    summary: 'Create an ocean freight booking request (FCL, LCL or bulk).',
    request: `{
  "mode": "FCL",
  "origin": "CNSHA",
  "destination": "ARBUE",
  "equipment": [{ "type": "40HC", "quantity": 2 }],
  "cargo": {
    "description": "Consumer electronics · e-commerce consolidation",
    "hsCodes": ["851712", "847130"],
    "grossWeightKg": 18400,
    "valueUsd": 96500,
    "hazardous": false
  },
  "readyDate": "2026-10-06",
  "incoterm": "CIF",
  "services": ["customs_clearance", "port_control"],
  "reference": "PO-88213"
}`,
    response: `{
  "bookingId": "bk_01J9Y3M4Q7X2",
  "status": "pending_confirmation",
  "reference": "PO-88213",
  "quote": { "currency": "USD", "amount": 7300, "validUntil": "2026-09-20T23:59:59Z" },
  "createdAt": "2026-09-04T15:32:11Z"
}`,
  },
  {
    method: 'GET',
    path: '/bookings/{bookingId}',
    summary: 'Retrieve a booking with its current milestone and documents.',
    response: `{
  "bookingId": "bk_01J9Y3M4Q7X2",
  "status": "in_transit",
  "vessel": { "name": "ONE APUS", "voyage": "042W", "imo": "9806079" },
  "etd": "2026-10-09", "eta": "2026-11-15",
  "containers": ["ONEU1234567", "ONEU7654321"],
  "documents": [
    { "type": "bill_of_lading", "number": "ONEYSHAB12345600", "url": "https://files.catlanticpartners.com/…" },
    { "type": "port_inspection_report", "url": "https://files.catlanticpartners.com/…" }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/shipments/{id}/events',
    summary: 'Tracking timeline for a booking, container or parcel, newest first.',
    response: `{
  "events": [
    { "code": "GATE_IN", "at": "2026-10-07T08:14:00Z", "location": "CNSHA", "source": "carrier" },
    { "code": "STUFFING_SUPERVISED", "at": "2026-10-06T16:40:00Z", "location": "CNSHA", "source": "surveyor",
      "attachments": ["https://files.catlanticpartners.com/…/tally.pdf"] },
    { "code": "BOOKING_CONFIRMED", "at": "2026-09-05T10:02:00Z", "source": "catlantic" }
  ],
  "nextCursor": null
}`,
  },
  {
    method: 'POST',
    path: '/inspections',
    summary: 'Order a port cargo control or verification through an appointed surveyor.',
    request: `{
  "bookingId": "bk_01J9Y3M4Q7X2",
  "type": "loading_supervision",
  "port": "CNSHA",
  "surveyorPreference": ["SGS", "Bureau Veritas"],
  "scope": ["tally", "seal", "weight", "photos"],
  "window": { "from": "2026-10-06", "to": "2026-10-07" }
}`,
    response: `{
  "inspectionId": "ins_01J9Y5B2KD8P",
  "status": "scheduled",
  "surveyor": "SGS",
  "reportExpectedBy": "2026-10-08T23:59:59Z"
}`,
  },
  {
    method: 'POST',
    path: '/parcels',
    summary: 'Register e-commerce parcels for consolidation and last-mile delivery.',
    request: `{
  "consolidationId": "con_01J9Y7QF3M",
  "parcels": [{
    "reference": "ORD-55123",
    "consignee": { "name": "…", "phone": "+54 9 11 …", "taxId": "20-12345678-9" },
    "address": { "line1": "…", "city": "Buenos Aires", "postalCode": "C1425", "country": "AR" },
    "declared": { "description": "Wireless headphones", "hsCode": "851830", "valueUsd": 85, "weightKg": 0.6 }
  }]
}`,
    response: `{
  "accepted": 1,
  "rejected": 0,
  "parcels": [{ "reference": "ORD-55123", "trackingNumber": "CTL-AR-7K3Q9M2", "regime": "courier" }]
}`,
  },
  {
    method: 'GET',
    path: '/parcels/{trackingNumber}',
    summary: 'Parcel status from origin consolidation to doorstep.',
    response: `{
  "trackingNumber": "CTL-AR-7K3Q9M2",
  "status": "out_for_delivery",
  "lastMilePartner": "partner_ar_01",
  "events": [
    { "code": "OUT_FOR_DELIVERY", "at": "2026-11-20T11:05:00-03:00", "city": "Buenos Aires" },
    { "code": "CUSTOMS_RELEASED", "at": "2026-11-18T17:20:00-03:00", "city": "Ezeiza" }
  ],
  "proofOfDelivery": null
}`,
  },
  {
    method: 'PUT',
    path: '/webhooks',
    summary: 'Register an HTTPS endpoint to receive events as they happen.',
    request: `{
  "url": "https://your-system.example/catlantic",
  "events": ["booking.*", "inspection.report_ready", "parcel.delivered"],
  "secret": "whsec_…"
}`,
    response: `{ "webhookId": "wh_01J9YA1C", "status": "active" }`,
  },
];

const eventCodes = [
  ['BOOKING_CONFIRMED', 'Space confirmed with carrier'],
  ['STUFFING_SUPERVISED', 'Surveyor supervised stuffing; tally attached'],
  ['GATE_IN', 'Container received at terminal'],
  ['LOADED', 'Loaded on board'],
  ['DEPARTED', 'Vessel sailed'],
  ['ARRIVED', 'Vessel arrived at discharge port'],
  ['DISCHARGE_SUPERVISED', 'Surveyor supervised discharge; draft survey / tally attached'],
  ['CUSTOMS_RELEASED', 'Cleared for delivery'],
  ['OUT_FOR_DELIVERY', 'With last-mile partner'],
  ['DELIVERED', 'Proof of delivery available'],
  ['EXCEPTION', 'Hold, damage, shortage or delay — see payload'],
];

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-line bg-ink-950 p-4 font-mono text-[0.74rem] leading-relaxed text-paper/85">
      <code>{children}</code>
    </pre>
  );
}

const methodClass: Record<Endpoint['method'], string> = {
  GET: 'text-status-good border-status-good/40',
  POST: 'text-series-1 border-series-1/40',
  PUT: 'text-status-warn border-status-warn/40',
};

export default function ApiDocs() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen bg-ink-950">
      <header className="shell flex h-[4.5rem] items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-paper" aria-label="Catlantic">
          <LogoMark size={34} />
          <span className="font-display text-fluid-base font-semibold tracking-tightest">CATLANTIC</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/" className="hidden text-fluid-sm text-muted hover:text-paper sm:inline">
            {t('api.back')}
          </Link>
        </div>
      </header>

      <main className="shell grid gap-12 pb-24 pt-10 lg:grid-cols-12 lg:pt-16">
        <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow mb-4">{t('api.eyebrow')}</p>
            <nav className="space-y-1 font-mono text-fluid-xs" aria-label="Sections">
              {['overview', 'authentication', 'endpoints', 'events', 'errors', 'limits', 'sandbox'].map((id) => (
                <a key={id} href={`#${id}`} className="block rounded-lg px-3 py-2 text-muted transition-colors hover:bg-paper/[0.04] hover:text-paper">
                  {id}
                </a>
              ))}
            </nav>
            <div className="mt-8">
              <Button to="/access?side=client&profile=logistics" size="sm" icon={<ArrowRight width={14} height={14} />} magnetic={false}>
                {t('api.apply')}
              </Button>
            </div>
          </div>
        </motion.aside>

        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-9">
          <section id="overview" className="scroll-mt-24">
            <h1 className="display text-fluid-2xl">{t('api.title')}</h1>
            <p className="mt-4 max-w-2xl text-pretty text-fluid-base text-muted">{t('api.body')}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-fluid-xs text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-status-good" />
              {t('api.status')}
            </p>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {[
                ['Base URL', BASE],
                ['Version', 'v1 · 2026-09'],
                ['Format', 'JSON over HTTPS · UTF-8'],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-900 p-5">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 break-all font-mono text-fluid-xs text-paper/85">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="authentication" className="mt-16 scroll-mt-24">
            <h2 className="display text-fluid-xl">Authentication</h2>
            <p className="mt-3 max-w-2xl text-fluid-sm text-muted">
              Every request carries a bearer token. Keys are issued per client and per environment after onboarding; rotate them from the dashboard. Requests without a valid key return <code className="font-mono text-paper">401</code>.
            </p>
            <div className="mt-5">
              <Code>{`curl ${BASE}/bookings/bk_01J9Y3M4Q7X2 \\
  -H "Authorization: Bearer ctl_live_…" \\
  -H "Accept: application/json"`}</Code>
            </div>
          </section>

          <section id="endpoints" className="mt-16 scroll-mt-24">
            <h2 className="display text-fluid-xl">Endpoints</h2>
            <div className="mt-6 space-y-6">
              {endpoints.map((ep) => (
                <div key={`${ep.method} ${ep.path}`} className="rounded-2xl border border-line bg-ink-900 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`rounded-md border px-2 py-0.5 font-mono text-[0.68rem] font-semibold ${methodClass[ep.method]}`}>{ep.method}</span>
                    <code className="font-mono text-fluid-sm text-paper">{ep.path}</code>
                  </div>
                  <p className="mt-3 text-fluid-sm text-muted">{ep.summary}</p>
                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    {ep.request && (
                      <div>
                        <p className="eyebrow mb-2">Request</p>
                        <Code>{ep.request}</Code>
                      </div>
                    )}
                    <div className={ep.request ? '' : 'xl:col-span-2'}>
                      <p className="eyebrow mb-2">Response · 200</p>
                      <Code>{ep.response}</Code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="events" className="mt-16 scroll-mt-24">
            <h2 className="display text-fluid-xl">Event codes</h2>
            <p className="mt-3 max-w-2xl text-fluid-sm text-muted">Events are emitted on the timeline and delivered to webhooks. Surveyor-sourced events carry the inspection report as an attachment.</p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-line">
              <table className="w-full border-collapse text-left text-fluid-xs">
                <tbody>
                  {eventCodes.map(([code, desc]) => (
                    <tr key={code} className="border-b border-line last:border-b-0">
                      <td className="w-64 bg-ink-900 px-4 py-2.5 font-mono text-paper">{code}</td>
                      <td className="px-4 py-2.5 text-muted">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="errors" className="mt-16 scroll-mt-24">
            <h2 className="display text-fluid-xl">Errors</h2>
            <div className="mt-5">
              <Code>{`{
  "error": {
    "code": "validation_failed",
    "message": "cargo.hsCodes[0] must be a 6-digit HS code",
    "requestId": "req_01J9YB7X"
  }
}
// 400 validation_failed · 401 unauthorized · 403 forbidden · 404 not_found
// 409 conflict · 422 unprocessable · 429 rate_limited · 5xx internal`}</Code>
            </div>
          </section>

          <section id="limits" className="mt-16 scroll-mt-24">
            <h2 className="display text-fluid-xl">Rate limits & idempotency</h2>
            <p className="mt-3 max-w-2xl text-fluid-sm text-muted">
              600 requests per minute per key; bursts are allowed up to 1,200. Send an <code className="font-mono text-paper">Idempotency-Key</code> header on POST requests so a retried booking or parcel registration is never duplicated. Limits and remaining quota are returned in <code className="font-mono text-paper">X-RateLimit-*</code> headers.
            </p>
          </section>

          <section id="sandbox" className="mt-16 scroll-mt-24">
            <h2 className="display text-fluid-xl">Sandbox</h2>
            <p className="mt-3 max-w-2xl text-fluid-sm text-muted">
              A sandbox at <code className="font-mono text-paper">https://sandbox.api.catlanticpartners.com/v1</code> accepts test keys (<code className="font-mono text-paper">ctl_test_…</code>) and replays a scripted voyage so integrations can be verified end to end before go-live.
            </p>
            <div className="mt-8 rounded-2xl border border-line bg-ink-900 p-6 font-mono text-[0.68rem] leading-relaxed text-faint">
              This reference describes the interface Catlantic exposes to onboarded logistics clients. Endpoints, payloads and limits may change before general availability; integration timelines are agreed per client. {company.name}.
            </div>
          </section>
        </motion.article>
      </main>
    </div>
  );
}
