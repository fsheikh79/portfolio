/**
 * Copy `text` to the user's clipboard with a legacy execCommand fallback.
 *
 * The modern `navigator.clipboard.writeText` API only works in "secure
 * contexts" (HTTPS, localhost, or 127.0.0.1). When the site is opened
 * over a plain-HTTP LAN IP for dev, the browser silently refuses the
 * async API and we need to fall back to the deprecated (but still
 * universally supported) execCommand approach.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (
      window.isSecureContext &&
      typeof navigator !== "undefined" &&
      navigator.clipboard?.writeText
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  return legacyExecCommandCopy(text);
}

function legacyExecCommandCopy(text: string): boolean {
  if (typeof document === "undefined") return false;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.setAttribute("aria-hidden", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  const previousSelection = document.getSelection()?.rangeCount
    ? document.getSelection()!.getRangeAt(0)
    : null;

  textarea.focus();
  textarea.select();

  let ok = false;
  try {
    // execCommand is deprecated but still the only reliable path when
    // the page isn't a secure context (LAN HTTP, some in-app browsers).
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(textarea);
  if (previousSelection) {
    const sel = document.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(previousSelection);
  }

  return ok;
}
