// preview page for newly created UI components

import Skeleton from "@/components/Skeleton"
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <h3>Avatar</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <Avatar name="alice" />
        <Avatar name="John" />
        <Avatar name="JohnDoe" />
        <Avatar name="PocketHeist" />
      </div>

      <h3>Skeleton</h3>
      <Skeleton count={20} />
    </div>
  )
}
