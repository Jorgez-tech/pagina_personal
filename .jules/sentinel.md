## 2024-05-23 - Reverse Tabnabbing Vulnerability
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** When a link uses `target="_blank"`, the linked page can access the `window.opener` object of the original page. This allows the linked page to redirect the original page to a malicious site (phishing) or execute scripts.
**Prevention:** Always add `rel="noopener noreferrer"` to any link that opens in a new tab (`target="_blank"`). This ensures the new page runs in a separate process and cannot access the opener window.
