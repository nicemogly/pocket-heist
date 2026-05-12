
// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p>
          Welcome to Pocket Heist — the workplace pranks league you never knew
          you needed. Create sneaky micro-missions, assign them to unsuspecting
          colleagues, and rack up points before the clock runs out.
        </p>
        <p>
          Whether you&apos;re hiding someone&apos;s stapler, rearranging the
          break-room mugs, or leaving a cryptic sticky note on the printer —
          every heist earns you notoriety. Are you bold enough to top the
          leaderboard?
        </p>
      </div>
    </div>
  )
}
